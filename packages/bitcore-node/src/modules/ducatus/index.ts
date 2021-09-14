import { BaseModule } from '..';

export default class DucatusModule extends BaseModule {
  constructor(services: BaseModule['bitcoreServices']) {
    super(services);

    services.Libs.register('DUC', '@ducatus/bitcore-lib', '@ducatus/bitcore-p2p');
    services.P2P.register('DUC', services.P2P.get('BTC'));
    services.CSP.registerService('DUC', services.CSP.get({ chain: 'BTC' }));
    services.Verification.register('DUC', services.Verification.get('BTC'));
  }
}
