import { BCHTxProvider } from './bch';
import { BTCTxProvider } from './btc';
import { DOGETxProvider } from './doge';
import { DRC20TxProvider } from './drc20';
import { DRC721TxProvider } from './drc721';
import { DUCTxProvider } from './duc';
import { DUCXTxProvider } from './ducx';
import { DUCXMULTISIGTxProvider } from './ducx-multisig';
import { ERC20TxProvider } from './erc20';
import { ERC721TxProvider } from './erc721';
import { ETHTxProvider } from './eth';
import { ETHMULTISIGTxProvider } from './eth-multisig';
import { LTCTxProvider } from './ltc';
import { TransferDUCXToWDUCXProvider } from './tob';
import { XRPTxProvider } from './xrp';

const providers = {
  BTC: new BTCTxProvider(),
  BCH: new BCHTxProvider(),
  ETH: new ETHTxProvider(),
  ERC20: new ERC20TxProvider(),
  ETHMULTISIG: new ETHMULTISIGTxProvider(),
  XRP: new XRPTxProvider(),
  DOGE: new DOGETxProvider(),
  LTC: new LTCTxProvider(),
  DUC: new DUCTxProvider(),
  DUCX: new DUCXTxProvider(),
  DRC20: new DRC20TxProvider(),
  DUCXMULTISIG: new DUCXMULTISIGTxProvider(),
  ERC721: new ERC721TxProvider(),
  DRC721: new DRC721TxProvider(),
  TOB: new TransferDUCXToWDUCXProvider()
};

export class TransactionsProxy {
  get({ chain }) {
    return providers[chain];
  }

  create(params) {
    return this.get(params).create(params);
  }

  sign(params): string {
    return this.get(params).sign(params);
  }

  getSignature(params): string {
    return this.get(params).getSignature(params);
  }

  applySignature(params) {
    return this.get(params).applySignature(params);
  }

  getHash(params) {
    return this.get(params).getHash(params);
  }
}

export default new TransactionsProxy();
