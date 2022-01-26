import { Transform } from 'stream';
import { MongoBound } from '../../../models/base';
import { IDucxTransaction } from '../types';
import { DUCX } from './csp';

export class PopulateReceiptTransform extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  async _transform(tx: MongoBound<IDucxTransaction>, _, done) {
    try {
      tx = await DUCX.populateReceipt(tx);
    } catch (e) {}
    this.push(tx);
    return done();
  }
}
