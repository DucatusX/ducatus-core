import { BaseModule } from '..';
import { DUCStateProvider } from '../../providers/chain-state/duc/duc';
import { VerificationPeer } from '../bitcoin/VerificationPeer';
import { DucP2PWorker } from './p2p';

export default class DucatusModule extends BaseModule {
  constructor(services: BaseModule['bitcoreServices']) {
    super(services);

    services.Libs.register('DUC', '@ducatus/bitcore-lib', '@ducatus/bitcore-p2p');
    services.P2P.register('DUC', DucP2PWorker);
    services.CSP.registerService('DUC', new DUCStateProvider());
    services.Verification.register('DUC', VerificationPeer);
  }
}
