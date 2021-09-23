import { DucatusLib } from '@ducatus/crypto-wallet-core';
import _ from 'lodash';
import { IChain } from '..';
import { BtcChain } from '../btc';

export class DucChain extends BtcChain implements IChain {
  constructor() {
    super(DucatusLib);
  }
}
