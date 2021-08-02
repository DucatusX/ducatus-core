import _ from 'lodash';
import { findConfig } from '../../utils/findConfig';
const config = findConfig();

module.exports = {
  name: 'Ducatus',
  url:
    config && config.productionMode
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
