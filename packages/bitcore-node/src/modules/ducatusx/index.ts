import { BaseModule } from '..';
import { DUCXStateProvider } from './api/csp';
import { DucxRoutes } from './api/ducx-routes';
import { DucxVerificationPeer } from './p2p/DucxVerificationPeer';
import { DucxP2pWorker } from './p2p/p2p'

export default class DUCXModule extends BaseModule {
  constructor(services: BaseModule['bitcoreServices']) {
    super(services);
    services.P2P.register('DUCX', DucxP2pWorker);
    services.CSP.registerService('DUCX', new DUCXStateProvider());
    services.Api.app.use(DucxRoutes);
    services.Verification.register('DUCX', DucxVerificationPeer);
  }
}
