import { BTCStateProvider } from '../btc/btc';

export class DUCStateProvider extends BTCStateProvider {
  constructor(chain: string = 'DUC') {
    super(chain);
  }
}
