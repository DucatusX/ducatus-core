module.exports = {
  BTC: {
    lib: require('bitcore-lib'),
    p2p: require('bitcore-p2p')
  },
  BCH: {
    lib: require('bitcore-lib-cash'),
    p2p: require('bitcore-p2p-cash')
  },
  DUC: {
    lib: require('ducatuscore-lib'),
    p2p: require('litecore-p2p'),
  }
};
