const BitcoreLibDuc = require('@ducatus/bitcore-lib');
import { AbstractBitcoreLibDeriver } from '../btc';
export class DucDeriver extends AbstractBitcoreLibDeriver {
  bitcoreLib = BitcoreLibDuc;
}
