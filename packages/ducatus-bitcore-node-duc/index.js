module.exports = class DucatusModule {
    constructor(services) {
        services.Libs.register('DUC', '@ducatus/bitcore-lib', '@ducatus/bitcore-p2p');
        services.P2P.register('DUC', services.P2P.get({chain:'BTC'}));
        services.CSP.registerService('DUC', services.CSP.get({chain:'BTC'}));
        services.Verification.register('DUC', services.Verification.get({chain:'BTC'}));
    }
}