import { BCHTxProvider } from './bch';
import { BTCTxProvider } from './btc';
import { DUCTxProvider } from './duc';
import { DUCXTxProvider } from './ducx';
import { ERC20TxProvider } from './erc20';
import { ETHTxProvider } from './eth';
import { XRPTxProvider } from './xrp';

const providers = {
  BTC: new BTCTxProvider(),
  BCH: new BCHTxProvider(),
  DUC: new DUCTxProvider(),
  ETH: new ETHTxProvider(),
  DUCX: new DUCXTxProvider(),
  ERC20: new ERC20TxProvider(),
  XRP: new XRPTxProvider()
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
