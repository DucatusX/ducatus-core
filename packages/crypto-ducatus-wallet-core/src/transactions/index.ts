import { BCHTxProvider } from './bch';
import { BTCTxProvider } from './btc';
import { DRC20TxProvider } from './drc20';
import { DUCTxProvider } from './duc';
import { DUCXTxProvider } from './ducx';
import { ERC20TxProvider } from './erc20';
import { ERC721TxProvider } from './erc721';
import { ETHTxProvider } from './eth';
import { TransferDUCXToWDUCXProvider } from './tob';
import { XRPTxProvider } from './xrp';

const providers = {
  BTC: new BTCTxProvider(),
  BCH: new BCHTxProvider(),
  DUC: new DUCTxProvider(),
  ETH: new ETHTxProvider(),
  DUCX: new DUCXTxProvider(),
  ERC20: new ERC20TxProvider(),
  DRC20: new DRC20TxProvider(),
  ERC721: new ERC721TxProvider(),
  XRP: new XRPTxProvider(),
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
