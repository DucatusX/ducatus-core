import _ from 'lodash';

module.exports = {
  name: 'Ducatus',
  url: process.env.PRODUCTION 
    ? 'https://rates.ducatuscoins.com/api/v1/rates/'
    : 'https://ducexpl.rocknblock.io/api/v1/rates/',
  parseFn(raw) {
    const rates = _.compact(
      _.map(raw, d => {
        if (!d.code || !d.rate) return null;
        return {
          code: d.code,
          value: +d.rate
        };
      })
    );
    return rates;
  }
};
