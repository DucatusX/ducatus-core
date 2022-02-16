const { MODE, NODE_PROD_URL, NODE_DEV_URL, NODE_LOCAL_URL, EXCHANGER_LIVENET_URL, EXCHANGER_TESTNET_URL } = process.env;
const defaultMode = 'prod';
const mode: 'prod' | 'dev' | 'local' = (MODE as 'prod' | 'dev' | 'local') || defaultMode;
const node = {
  prod: NODE_PROD_URL || 'http://ducatus-wallet-node.someworkforrumble.fun',
  dev: NODE_DEV_URL || 'http://localhost:3000',
  local: NODE_LOCAL_URL || 'http://localhost:3000'
};

module.exports = {
  basePath: '/bws/api',
  disableLogs: false,
  port: 3232,
  productionMode: mode === 'prod',
  nodeUrl: node[mode],
  exchangerUrl: {
    livenet: EXCHANGER_LIVENET_URL || 'https://www.ducatuscoins.com',
    testnet: EXCHANGER_TESTNET_URL || 'https://devducatus.rocknblock.io'
  },
  // Uncomment to make BWS a forking server
  // cluster: true,

  // Uncomment to set the number or process (will use the nr of availalbe CPUs by default)
  // clusterInstances: 4,

  // https: true,
  // privateKeyFile: 'private.pem',
  // certificateFile: 'cert.pem',
  ////// The following is only for certs which are not
  ////// trusted by nodejs 'https' by default
  ////// CAs like Verisign do not require this
  // CAinter1: '', // ex. 'COMODORSADomainValidationSecureServerCA.crt'
  // CAinter2: '', // ex. 'COMODORSAAddTrustCA.crt'
  // CAroot: '', // ex. 'AddTrustExternalCARoot.crt'

  storageOpts: {
    mongoDb: {
      uri: 'mongodb://localhost:27017/bws'
    }
  },
  messageBrokerOpts: {
    //  To use message broker server, uncomment this:
    messageBrokerServer: {
      url: 'http://localhost:3380'
    }
  },
  blockchainExplorerOpts: {
    duc: {
      livenet: {
        url: node[mode]
      },
      testnet: {
        url: node[mode],
        regtestEnabled: false
      }
    },
    ducx: {
      livenet: {
        url: node[mode]
      },
      testnet: {
        url: node[mode]
      }
    },
    btc: {
      livenet: {
        url: 'https://api.bitcore.io'
      },
      testnet: {
        url: 'https://api.bitcore.io',
        regtestEnabled: false
      }
    },
    bch: {
      livenet: {
        url: 'https://api.bitcore.io'
      },
      testnet: {
        url: 'https://api.bitcore.io'
      }
    },
    eth: {
      livenet: {
        url: 'https://api-eth.bitcore.io'
      },
      testnet: {
        url: 'https://api-eth.bitcore.io'
      }
    },
    xrp: {
      livenet: {
        url: 'https://api-xrp.bitcore.io'
      },
      testnet: {
        url: 'https://api-xrp.bitcore.io'
      }
    },
    socketApiKey: 'socketApiKey'
  },
  pushNotificationsOpts: {
    templatePath: 'templates',
    defaultLanguage: 'en',
    defaultUnit: 'btc',
    subjectPrefix: '',
    pushServerUrl: 'https://fcm.googleapis.com/fcm',
    authorizationKey: 'You_have_to_put_something_here'
  },
  fiatRateServiceOpts: {
    defaultProvider: 'BitPay',
    fetchInterval: 60 // in minutes
  },
  maintenanceOpts: {
    maintenanceMode: false
  },
  staticRoot: '/tmp/static'
  // ignoreRateLimiter: true
  // simplex: {
  //   sandbox: {
  //     apiKey: 'simplex_sandbox_api_key_here',
  //     api: 'https://sandbox.test-simplexcc.com',
  //     appProviderId: 'simplex_provider_id_here'
  //   },
  //   production: {
  //     apiKey: 'simplex_production_api_key_here',
  //     api: 'https://backend-wallet-api.simplexcc.com',
  //     appProviderId: 'simplex_provider_id_here'
  //   }
  // },
  // To use email notifications uncomment this:
  // emailOpts: {
  //  host: 'localhost',
  //  port: 25,
  //  ignoreTLS: true,
  //  subjectPrefix: '[Wallet Service]',
  //  from: 'wallet-service@bitcore.io',
  //  templatePath: 'templates',
  //  defaultLanguage: 'en',
  //  defaultUnit: 'btc',
  //  publicTxUrlTemplate: {
  //    btc: {
  //      livenet: 'https://insight.bitcore.io/#/BTC/mainnet/tx/{{txid}}',
  //      testnet: 'https://insight.bitcore.io/#/BTC/testnet/tx/{{txid}}',
  //    },
  //    bch: {
  //      livenet: 'https://insight.bitcore.io/#/BCH/mainnet/tx/{{txid}}',
  //      testnet: 'https://insight.bitcore.io/#/BCH/testnet/tx/{{txid}}',
  //    }
  //  },
  // },
  // To use sendgrid:
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  //
  //
  // //then add:
  // mailer: sgMail,
};
