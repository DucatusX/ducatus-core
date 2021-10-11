'use strict';
import * as CWC from '@ducatus/crypto-wallet-core';

module.exports = {
  COINS: {
    BTC: 'btc',
    BCH: 'bch',
    ETH: 'eth',
    XRP: 'xrp',
    DOGE: 'doge',
    LTC: 'ltc',
    USDC: 'usdc',
    PAX: 'pax',
    GUSD: 'gusd',
    BUSD: 'busd',
    DAI: 'dai',
    WBTC: 'wbtc',
    DUC: 'duc',
    DUCX: 'ducx',
    JAMASY: 'jamasy',
    NUYASA: 'nuyasa',
    SUNOBA: 'sunoba',
    DSCMED: 'dscmed',
    POG1: 'pog1',
    WDE: 'wde',
    MDXB: 'mdxb'
  },

  ERC20: {
    USDC: 'usdc',
    PAX: 'pax',
    GUSD: 'gusd',
    BUSD: 'busd',
    DAI: 'dai',
    WBTC: 'wbtc'
  },

  DRC20: {
    JAMASY: 'jamasy',
    NUYASA: 'nuyasa',
    SUNOBA: 'sunoba',
    DSCMED: 'dscmed',
    POG1: 'pog1',
    WDE: 'wde',
    MDXB: 'mdxb'
  },

  UTXO_COINS: {
    BTC: 'btc',
    BCH: 'bch',
    DOGE: 'doge',
    LTC: 'ltc',
    DUC: 'duc'
  },

  NETWORKS: {
    LIVENET: 'livenet',
    TESTNET: 'testnet'
  },

  ADDRESS_FORMATS: ['copay', 'cashaddr', 'legacy', 'ducatus'],

  SCRIPT_TYPES: {
    P2SH: 'P2SH',
    P2WSH: 'P2WSH',
    P2PKH: 'P2PKH',
    P2WPKH: 'P2WPKH'
  },
  DERIVATION_STRATEGIES: {
    BIP44: 'BIP44',
    BIP45: 'BIP45'
  },

  PATHS: {
    SINGLE_ADDRESS: "m/0'/0",
    REQUEST_KEY: "m/1'/0",
    TXPROPOSAL_KEY: "m/1'/1",
    REQUEST_KEY_AUTH: 'm/2' // relative to BASE
  },

  BIP45_SHARED_INDEX: 0x80000000 - 1,

  TOKEN_OPTS: CWC.Constants.TOKEN_OPTS,

  DUCX_TOB_ADDRESSES: CWC.Constants.DUCX_CONSTANTS.DUCX_TOB_ADDRESSES
};
