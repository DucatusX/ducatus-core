import { BaseModule } from '..';
import { DucxRoutes } from './api/ducx-routes';

export default class DUCXModule extends BaseModule {
  constructor(services: BaseModule['bitcoreServices']) {
    super(services);
    services.P2P.register('DUCX', services.P2P.get('ETH'));
    services.CSP.registerService('DUCX', services.CSP.get({chain: 'ETH'}));
    services.Api.app.use(DucxRoutes);
    services.Verification.register('DUCX', services.Verification.get('ETH'));
  }
}
