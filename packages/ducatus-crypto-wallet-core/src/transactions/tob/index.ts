import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Constants } from '../../constants';
import { DUCXTxProvider } from '../ducx';
import abi from './abi';

export class TransferDUCXToWDUCXProvider extends DUCXTxProvider {
  getTOBContract(contract: string) {
    const web3 = new Web3();
    const { DUCX_CONSTANTS } = Constants;
    const { DUCX_TOB_ADDRESSES } = DUCX_CONSTANTS;
    const contracts = {};

    DUCX_TOB_ADDRESSES.forEach((address: string) => {
      contracts[address] = new web3.eth.Contract(abi as AbiItem[], address);
    });

    return contracts[contract];
  }

  create(params) {
    const { tokenAddress } = params;
    const data = this.encodeData(params);
    const recipients = [{ address: tokenAddress, amount: params.amount }];
    const newParams = { ...params, recipients, data };
    return super.create(newParams);
  }

  encodeData(params) {
    const data = this.getTOBContract(params.tokenAddress)
      .methods.transferToOtherBlockchain(1, params.recipients[0].address)
      .encodeABI();
    return data;
  }
}
