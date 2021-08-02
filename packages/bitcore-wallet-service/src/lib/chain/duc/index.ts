import { DucatuscoreLib } from 'crypto-ducatus-wallet-core';
import { IChain } from '..';
import { BtcChain } from '../btc';

const Common = require('../../common');
const Constants = Common.Constants;
const Defaults = Common.Defaults;

import _ from 'lodash';
import { ClientError } from '../../errors/clienterror';

const $ = require('preconditions').singleton();
const Errors = require('../../errors/errordefinitions');

export class DucChain extends BtcChain implements IChain {
  constructor() {
    super(DucatuscoreLib);
  }

  validateAddress(wallet, inaddr, opts) {
    const A = DucatuscoreLib.Address;
    let addr: {
      network?: string;
      toString?: (cashAddr: boolean) => string;
    } = {};
    try {
      addr = new A(inaddr);
    } catch (ex) {
      throw Errors.INVALID_ADDRESS;
    }

    if (addr.network.toString() != wallet.network) {
      throw Errors.INCORRECT_ADDRESS_NETWORK;
    }
    return;
  }
  getChangeAddress(server, wallet, opts) {
    return new Promise((resolve, reject) => {
      const getChangeAddress = (wallet, cb) => {
        if (wallet.singleAddress) {
          server.storage.fetchAddresses(server.walletId, (err, addresses) => {
            if (err) return cb(err);
            if (_.isEmpty(addresses)) return cb(new ClientError('The wallet has no addresses'));
            return cb(null, _.head(addresses));
          });
        } else {
          if (opts.changeAddress) {
            try {
              this.validateAddress(wallet, opts.changeAddress, opts);
            } catch (addrErr) {
              return cb(addrErr);
            }

            server.storage.fetchAddressByWalletId(wallet.id, opts.changeAddress, (err, address) => {
              if (err || !address) return cb(Errors.INVALID_CHANGE_ADDRESS);
              return cb(null, address);
            });
          } else {
            return cb(null, wallet.createAddress(true), true);
          }
        }
      };

      getChangeAddress(wallet, (err, address, isNew) => {
        if (err) return reject(err);
        return resolve(address);
      });
    });
  }

  buildTx(txp) {
    const t = new DucatuscoreLib.Transaction();

    t.setVersion(1);

    switch (txp.addressType) {
      case Constants.SCRIPT_TYPES.P2WSH:
      case Constants.SCRIPT_TYPES.P2SH:
        _.each(txp.inputs, i => {
          $.checkState(i.publicKeys, 'Inputs should include public keys');
          t.from(i, i.publicKeys, txp.requiredSignatures);
        });
        break;
      case Constants.SCRIPT_TYPES.P2WPKH:
      case Constants.SCRIPT_TYPES.P2PKH:
        t.from(txp.inputs);
        break;
    }

    _.each(txp.outputs, o => {
      $.checkState(o.script || o.toAddress, 'Output should have either toAddress or script specified');
      if (o.script) {
        t.addOutput(
          new DucatuscoreLib.Transaction.Output({
            script: o.script,
            satoshis: o.amount
          })
        );
      } else {
        t.to(o.toAddress, o.amount);
      }
    });

    t.fee(txp.fee);

    if (txp.changeAddress) {
      t.change(txp.changeAddress.address);
    }

    // Shuffle outputs for improved privacy
    if (t.outputs.length > 1) {
      const outputOrder = _.reject(txp.outputOrder, (order: number) => {
        return order >= t.outputs.length;
      });
      $.checkState(t.outputs.length == outputOrder.length);
      t.sortOutputs(outputs => {
        return _.map(outputOrder, i => {
          return outputs[i];
        });
      });
    }

    // Validate actual inputs vs outputs independently of Bitcore
    const totalInputs = _.sumBy(t.inputs, 'output.satoshis');
    const totalOutputs = _.sumBy(t.outputs, 'satoshis');

    $.checkState(totalInputs > 0 && totalOutputs > 0 && totalInputs >= totalOutputs, 'not-enought-inputs');
    $.checkState(totalInputs - totalOutputs <= Defaults.MAX_TX_FEE[txp.coin], 'fee-too-high');

    return t;
  }

  addSignaturesToBitcoreTx(tx, inputs, inputPaths, signatures, xpub) {
    if (signatures.length != inputs.length) throw new Error('Number of signatures does not match number of inputs');

    let i = 0;
    const x = new DucatuscoreLib.HDPublicKey(xpub);

    _.each(signatures, signatureHex => {
      try {
        const signature = DucatuscoreLib.crypto.Signature.fromString(signatureHex);
        const pub = x.deriveChild(inputPaths[i]).publicKey;
        const s = {
          inputIndex: i,
          signature,
          sigtype:
            // tslint:disable-next-line:no-bitwise
            DucatuscoreLib.crypto.Signature.SIGHASH_ALL | DucatuscoreLib.crypto.Signature.SIGHASH_FORKID,
          publicKey: pub
        };
        tx.inputs[i].addSignature(tx, s);
        i++;
      } catch (e) {}
    });

    if (i != tx.inputs.length) throw new Error('Wrong signatures');
  }
}
