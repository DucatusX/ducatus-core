'use strict';

module.exports = {
  COINS: {
    BTC: 'btc',
    BCH: 'bch',
    DUC: 'duc',
    DUCX: 'ducx',
    ETH: 'eth',
    XRP: 'xrp',
    USDC: 'usdc',
    PAX: 'pax',
    GUSD: 'gusd',
    JAMASY: 'jamasy',
    NUYASA: 'nuyasa',
    SUNOBA: 'sunoba',
    DSCMED: 'dscmed',
    POG1: 'pog1',
    WDE: 'wde',
    MDXB: 'mdxb',
  },

  ERC20: {
    USDC: 'usdc',
    PAX: 'pax',
    GUSD: 'gusd',
  },
  DRC20: {
    JAMASY: 'jamasy',
    NUYASA: 'nuyasa',
    SUNOBA: 'sunoba',
    DSCMED: 'dscmed',
    POG1: 'pog1',
    WDE: 'wde',
    MDXB: 'mdxb',
  },
  UTXO_COINS: {
    BTC: 'btc',
    BCH: 'bch',
    DUC: 'duc',
  },

  NETWORKS: {
    LIVENET: 'livenet',
    TESTNET: 'testnet',
  },

  ADDRESS_FORMATS: ['copay', 'cashaddr', 'legacy', 'ducatus'],

  SCRIPT_TYPES: {
    P2SH: 'P2SH',
    P2WSH: 'P2WSH',
    P2PKH: 'P2PKH',
    P2WPKH: 'P2WPKH',
  },
  DERIVATION_STRATEGIES: {
    BIP44: 'BIP44',
    BIP45: 'BIP45',
  },

  PATHS: {
    SINGLE_ADDRESS: "m/0'/0",
    REQUEST_KEY: "m/1'/0",
    TXPROPOSAL_KEY: "m/1'/1",
    REQUEST_KEY_AUTH: 'm/2', // relative to BASE
  },

  BIP45_SHARED_INDEX: 0x80000000 - 1,

  TOKEN_OPTS: {
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': {
      name: 'USD Coin',
      symbol: 'USDC',
      decimal: 6,
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
    '0x8e870d67f660d95d5be530380d0ec0bd388289e1': {
      name: 'Paxos Standard',
      symbol: 'PAX',
      decimal: 18,
      address: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
    },
    '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd': {
      name: 'Gemini Dollar',
      symbol: 'GUSD',
      decimal: 2,
      address: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
    },
    '0xa9CB8e18E4C2C0a1C9Bf4367E7115165ed7e41F0': {
      name: 'JAMASY',
      symbol: 'JAMASY',
      decimal: 8,
      address: '0xa9CB8e18E4C2C0a1C9Bf4367E7115165ed7e41F0',
    },
    '0x3D30806b1E1F021Fe12DF506C3A1F96CfB94464a': {
      name: 'NUYASA',
      symbol: 'NUYASA',
      decimal: 8,
      address: '0x3D30806b1E1F021Fe12DF506C3A1F96CfB94464a',
    },
    '0xB7A7221E37d12A8Ea92468F283422B16DbC364D9': {
      name: 'SUNOBA',
      symbol: 'SUNOBA',
      decimal: 8,
      address: '0xB7A7221E37d12A8Ea92468F283422B16DbC364D9',
    },
    '0x14460383feFFE73eA1FB4F0F11B941F44c17bDD2': {
      name: 'DSCMED',
      symbol: 'DSCMED',
      decimal: 8,
      address: '0x14460383feFFE73eA1FB4F0F11B941F44c17bDD2',
    },
    '0x511e1f8e872c3fe9b3fCefEf58ec7FE4E8130Cc1': {
      name: 'POG1',
      symbol: 'POG1',
      decimal: 8,
      address: '0x511e1f8e872c3fe9b3fCefEf58ec7FE4E8130Cc1',
    },
    '0x17CaCa02DDf472F62bFED5165FACf7A6B5C72926': {
      name: 'WDE',
      symbol: 'WDE',
      decimal: 8,
      address: '0x17CaCa02DDf472F62bFED5165FACf7A6B5C72926',
    },
    '0x60DFde24CdE54df342E52a72248B2bD54e0ea4A5': {
      name: 'MDXB',
      symbol: 'MDXB',
      decimal: 8,
      address: '0x60DFde24CdE54df342E52a72248B2bD54e0ea4A5',
    },
  },
};
