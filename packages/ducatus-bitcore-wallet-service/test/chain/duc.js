'use strict';

const _ = require('lodash');
const chai = require('chai');
const should = chai.should();
const { DucatusLib } = require('@ducatus/crypto-wallet-core');
const { ChainService } = require('../../ts_build/lib/chain');
const { DucChain } = require('../../ts_build/lib/chain/duc');
const { TxProposal } = require('../../ts_build/lib/model/txproposal');

const Common = require('../../ts_build/lib/common');
const Constants = Common.Constants;

describe('Chain DUC', () => {
  describe('#getBitcoreTx', () => {
    it('should create a valid bitcore TX', () => {
      const txp = TxProposal.fromObj(aTXP());
      const t = ChainService.getBitcoreTx(txp);
      should.exist(t);
    });
    it('should order outputs as specified by outputOrder', () => {
      const txp = TxProposal.fromObj(aTXP());

      txp.outputOrder = [0, 1, 2];
      const t = ChainService.getBitcoreTx(txp);
      t.getChangeOutput().should.deep.equal(t.outputs[2]);

      txp.outputOrder = [2, 0, 1];
      const t2 = ChainService.getBitcoreTx(txp);
      t2.getChangeOutput().should.deep.equal(t2.outputs[0]);
    });

    it('should create a valid signed bitcore TX', () => { 
      const txp = TxProposal.fromObj(signedTxp); 
      const t = ChainService.getBitcoreTx(txp);
      should.exist(t);
      // should serialized
      t.serialize().should.equal('0100000001a1a568de0ae422414c00c92b586f530c37917f84ac29ef4a8cd4b4ff0c1e60ec0a0000006b483045022100e98bf8049c7cf2f76c6f3b5fbe4972b38f12de896bf27b25c5068861faec03a80220770f6e364d1d0f218ec4d5a20935bfd5b0cb76a9f16cccbc12d4c87e0200fa360121024d27ca79a3ed27a143cb9d1dff01e4e6445294679a700ca404ca449211d08aa7ffffffff022cd8f505000000001976a9149edd2399faccf4e57df08bef78962fa0228741cf88ac00e1f505000000001976a91478ca249e8e9e09d2fda2c0965583ca01f08f15f288ac00000000');
      t.isFullySigned().should.equal(true);
    });

    it('should create a valid unsigned bitcore TX', () => { 
      const txp = TxProposal.fromObj(signedTxp);
      const t = ChainService.getBitcoreTx(txp, { signed: false } );
      should.exist(t);

      // should serialized
      (() => { return t.serialize(); }).should.throw('not been fully signed');
      console.log(t.uncheckedSerialize());
      t.uncheckedSerialize().should.equal('0100000001a1a568de0ae422414c00c92b586f530c37917f84ac29ef4a8cd4b4ff0c1e60ec0a00000000ffffffff022cd8f505000000001976a9149edd2399faccf4e57df08bef78962fa0228741cf88ac00e1f505000000001976a91478ca249e8e9e09d2fda2c0965583ca01f08f15f288ac00000000');
      t.isFullySigned().should.equal(false);
    });
  });

  describe('#getEstimatedSize', () => {
    let duc, fromAddress, simpleUtxoWith1DUC, changeAddress, toAddress, privateKey;

    before(() =>  {
      duc = new DucChain();
      fromAddress = 'LuaEVV9qhtx3ZAvxxYyr3EMjZnnSakd1B4';
      toAddress = 'Lx4Zqrdpqu8muneGYWRoZWth47uqhmVKum';
      changeAddress = 'LwjA4i9h2SVTtAszTmt5t2Mh7V6NyryvdC';
      privateKey = 'TEvTjJWUz5KGH5pTA2uuofne43SSvRJ7AFjCynuHpwSP35W1MKWP';
      simpleUtxoWith1DUC = {
        address: fromAddress,
        txId: 'a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458',
        outputIndex: 0,
        script: DucatusLib.Script.buildPublicKeyHashOut(fromAddress).toString(),
        satoshis: 1e8,
      };

      const privKey = new DucatusLib.PrivateKey();
    });

    it('1 input p2pkh,1 output p2pkh: Margin should be 10%', () => {
      let x = TxProposal.fromObj(aTXP());
      delete x.changeAddress;
      x.outputs.pop();
      x.addressType = Constants.SCRIPT_TYPES.P2PKH;
      const estimatedLength = duc.getEstimatedSize(x);

      // Create a similar TX.
      let tx = new DucatusLib.Transaction();
      tx.from(simpleUtxoWith1DUC)
        .to([{ address: toAddress, satoshis: 1e8 - 7000 }])
        .sign(privateKey);

      const actualLength = tx.serialize().length / 2;

      // Check margin is ~0.0
      ((Math.abs(actualLength-estimatedLength))/actualLength).should.not.be.above(0.05);
    });

    const p2shPrivateKey1 = DucatusLib.PrivateKey.fromWIF('TH7rJV5apzsqJJPrfWRmnCQwMgnaRDRE5wWeyZuFzhVPmCQDf7po');
    const p2shPublicKey1 = p2shPrivateKey1.toPublicKey();
    const p2shPrivateKey2 = DucatusLib.PrivateKey.fromWIF('TKxM64RXiFdph77UyZrLVRHfn7V7ya42LVVKBW2SPNnpA26Ezeqi');
    const p2shPublicKey2 = p2shPrivateKey2.toPublicKey();

    const p2shAddress = DucatusLib.Address.createMultisig([
      p2shPublicKey1,
      p2shPublicKey2,
    ], 2, 'mainnet');
    const p2shUtxoWith1BTC = {
      address: p2shAddress.toString(),
      txId: 'a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458',
      outputIndex: 0,
      script: DucatusLib.Script(p2shAddress).toString(),
      satoshis: 1e8
    };

    it('1 input p2sh, 2 P2PKH outputs: ', () => {
      let x = TxProposal.fromObj(aTXP());

      // Create a similar TX.
      let tx = new DucatusLib.Transaction();
      tx.from(p2shUtxoWith1BTC, [p2shPublicKey1, p2shPublicKey2], 2)
        .to([{ address: toAddress, satoshis: 1e7 }, { address: toAddress, satoshis: 1e6 }])
        .change(changeAddress)
        .sign(p2shPrivateKey1)
        .sign(p2shPrivateKey2);
      const estimatedLength = duc.getEstimatedSize(x);

      const actualLength = tx.serialize().length / 2;
      ((Math.abs(actualLength-estimatedLength))/actualLength).should.be.below(0.05);
    });

    it('1 input p2wpkh, 1 Native Segwit output: ', () => {
      let x = TxProposal.fromObj(aTXP());

      // just to force the desired calculation
      x.addressType = Constants.SCRIPT_TYPES.P2WPKH;

      x.outputs[0].toAddress = 'Lx4Zqrdpqu8muneGYWRoZWth47uqhmVKum';
      x.outputs.pop();
      delete x.changeAddress;
      const estimatedLength = duc.getEstimatedSize(x);

      // https://bitcoin.stackexchange.com/questions/84004/how-do-virtual-size-stripped-size-and-raw-size-compare-between-legacy-address-f
      const actualLength = 437 / 4; // this is the vsize
      ((Math.abs(actualLength-estimatedLength))/actualLength).should.be.below(0.05);
    });

    it('2 input multisig p2wsh, 1 native segwit output: ', () => {
      let x = TxProposal.fromObj(aTXP());
      x.addressType = Constants.SCRIPT_TYPES.P2WSH;
      x.outputs[0].toAddress = toAddress;
      delete x.changeAddress;
      x.outputs.pop();
      const estimatedLength = duc.getEstimatedSize(x);

      // from https://bitcoin.stackexchange.com/questions/88226/how-to-calculate-the-size-of-multisig-transaction
      const actualLength = (346 + 2 * 108) / 4; // this is the vsize
      ((Math.abs(actualLength-estimatedLength))/actualLength).should.be.below(0.05);
    });
  });
});

const aTXP = () => {
  const txp = {
    'version': 3,
    'createdOn': 1423146231,
    'id': '75c34f49-1ed6-255f-e9fd-0c71ae75ed1e',
    'walletId': '1',
    'creatorId': '1',
    'coin': 'duc',
    'network': 'livenet',
    'amount': 30000000,
    'message': 'some message',
    'proposalSignature': '7035022100896aeb8db75fec22fddb5facf791927a996eb3aee23ee6deaa15471ea46047de02204c0c33f42a9d3ff93d62738712a8c8a5ecd21b45393fdd144e7b01b5a186f1f9',
    'changeAddress': {
      'version': '1.0.0',
      'createdOn': 1424372337,
      'address': 'Mqk4nAueP6eBW1ZNRFKuYXgpUoUdnFhN38',
      'path': 'm/2147483647/1/0',
      'publicKeys': [
        '030562cb099e6043dc499eb359dd97c9d500a3586498e4bcf0228a178cc20e6f16',
        '0367027d17dbdfc27b5e31f8ed70e14d47949f0fa392261e977db0851c8b0d6fac',
        '0315ae1e8aa866794ae603389fb2b8549153ebf04e7cdf74501dadde5c75ddad11'
      ]
    },
    'inputs': [{
      'txid': '6ee699846d2d6605f96d20c7cc8230382e5da43342adb11b499bbe73709f06ab',
      'vout': 8,
      'satoshis': 100000000,
      'scriptPubKey': 'a914a8a9648754fbda1b6c208ac9d4e252075447f36887',
      'address': 'MncZfNoYigpMzjLcykzhRGSk4tsoH5au5N',
      'path': 'm/2147483647/0/1',
      'publicKeys': ['0319008ffe1b3e208f5ebed8f46495c056763f87b07930a7027a92ee477fb0cb0f', '03b5f035af8be40d0db5abb306b7754949ab39032cf99ad177691753b37d101301']
    }],
    'inputPaths': ['m/2147483647/0/1'],
    'requiredSignatures': 2,
    'requiredRejections': 1,
    'walletN': 2,
    'addressType': 'P2SH',
    'status': 'pending',
    'actions': [],
    'fee': 10000,
    'outputs': [{
      'toAddress': 'LpMGyYuobFtxdwbhocVgfuU3sG9jA1PXML',
      'amount': 10000000,
      'message': 'first message'
    }, {
      'toAddress': 'LpKsqmv9XAQgZeEqJg7jAw88CfcdSzeoLJ',
      'amount': 20000000,
      'message': 'second message'
    }, ],
    'outputOrder': [0, 1, 2]
  };

  return txp;
};

const signedTxp = {
  actions: [
    {
      'version': '1.0.0',
      'createdOn': 1632924786,
      'copayerId': '16758d46d97f8d93b201152f7c7f5d0f289012de172dc771c0b42b290b394a1e',
      'type': 'accept',
      'signatures': [
        '3045022100e98bf8049c7cf2f76c6f3b5fbe4972b38f12de896bf27b25c5068861faec03a80220770f6e364d1d0f218ec4d5a20935bfd5b0cb76a9f16cccbc12d4c87e0200fa36'
      ],
      'xpub': 'xpub6DVmxcjRgZdHNSEcXSiFtweVwMSTc3TMwRJ45nJYvyqvLbK1poPerupqh87rSoz27wvckb1CKnGZoLmLXSZyNGZtVd7neqSvdwJL6fceQpe',
      'comment': null
    }
  ],
  addressType: 'P2PKH',
  amount: 100000000,
  broadcastedOn: null,
  chain: 'DUC',
  changeAddress: {
    address: 'Ly3YveE6B9aV1TAiS3dAQNMut37ofqNx2X',
    beRegistered: null,
    coin: 'duc',
    createdOn: 1632924786,
    hasActivity: null,
    isChange: true,
    network: 'livenet',
    path: 'm/1/0',
    publicKeys: [
      '02129acdcc600694b3ce55a2d05244186e806174eb0bafde20e5a6395ded647857'
    ],
    walletId: '5d995b0a-7cc6-4473-986b-29da88ff8ac6',
    type: 'P2PKH',
    version: '1.0.0'
  },
  coin: 'duc',
  createdOn: 1632924786,
  creatorId: '16758d46d97f8d93b201152f7c7f5d0f289012de172dc771c0b42b290b394a1e',
  creatorName: 'copayer 1',
  customData: null,
  data: null,
  derivationStrategy: 'BIP44',
  destinationTag: null,
  excludeUnconfirmedUtxos: false,
  fee: 2260,
  feeLevel: null,
  feePerKb: 10000,
  from: null,
  gasLimit: null,
  gasPrice: null,
  id: '245662d1-cd79-455e-b558-805a3fabb7d7',
  inputPaths: ['m/0/1'],
  inputs: [
    {
      address: 'M3rEc34QcyjMiKPoijPAVn5JpJKtAAoMhM',
      confirmations: 90,
      path: 'm/0/1',
      publicKeys: ['024d27ca79a3ed27a143cb9d1dff01e4e6445294679a700ca404ca449211d08aa7'],
      satoshis: 200000000,
      scriptPubKey: '76a914d391e62337ed194a1e428f32d14838e5d848180a88ac',
      txid: 'ec601e0cffb4d48c4aef29ac847f91370c536f582bc9004c4122e40ade68a5a1',
      vout: 10,
      wallet: '5d995b0a-7cc6-4473-986b-29da88ff8ac6'
    }
  ],
  invoiceID: null,
  isTokenSwap: null,
  lockUntilBlockHeight: null,
  message: 'some message',
  multisigContractAddress: null,
  multisigTxId: null,
  network: 'livenet',
  nonce: null,
  outputOrder: [1,0],
  outputs: [
    {
      amount: 100000000,
      toAddress: 'LuaEVV9qhtx3ZAvxxYyr3EMjZnnSakd1B4'
    }
  ],
  payProUrl: null,
  proposalSignature: '3045022100bc680b212c2f8415f1c11f003b2bb6d3edcf88acf4edb4b1b7d64474214e8b040220558fa05512a0ab2613a55d33cc4643ca032a89cff61b4493459e05386ffc73fd',
  proposalSignaturePubKey: null,
  proposalSignaturePubKeySig: null,
  raw: '0100000001a1a568de0ae422414c00c92b586f530c37917f84ac29ef4a8cd4b4ff0c1e60ec0a0000006b483045022100e98bf8049c7cf2f76c6f3b5fbe4972b38f12de896bf27b25c5068861faec03a80220770f6e364d1d0f218ec4d5a20935bfd5b0cb76a9f16cccbc12d4c87e0200fa360121024d27ca79a3ed27a143cb9d1dff01e4e6445294679a700ca404ca449211d08aa7ffffffff022cd8f505000000001976a9149edd2399faccf4e57df08bef78962fa0228741cf88ac00e1f505000000001976a91478ca249e8e9e09d2fda2c0965583ca01f08f15f288ac00000000',
  requiredRejections: 1,
  requiredSignatures: 1,
  signingMethod: 'ecdsa',
  status: 'accepted',
  tokenAddress: null,
  txid: '11574ab9bc323afa8b36650f4dffc53a222f28120d50a9d894b4d1f2d6e3e496',
  version: 3,
  walletId: '5d995b0a-7cc6-4473-986b-29da88ff8ac6',
  walletM: 1,
  walletN: 1
};
