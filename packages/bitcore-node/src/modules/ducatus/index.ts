import { BitcoinP2PWorker } from '../bitcoin/p2p';
import { BaseModule } from '..';
import { DUCStateProvider } from '../../providers/chain-state/duc/duc';

export default class DUCModule extends BaseModule {
  constructor(services) {
    super(services);
    services.Libs.register('DUC', 'ducatuscore-lib', 'litecore-p2p');
    services.P2P.register('DUC', BitcoinP2PWorker);
    services.CSP.registerService('DUC', new DUCStateProvider());
  }
}
