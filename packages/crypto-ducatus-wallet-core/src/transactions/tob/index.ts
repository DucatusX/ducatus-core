import Web3 from 'web3';
import { DUCXTxProvider } from '../ducx';
import abi from './abi';

export class TransferDUCXToWDUCXProvider extends DUCXTxProvider {
  getERC20Contract(contract: string) {
    const web3 = new Web3();
    // const contract = new web3.eth.Contract(abi, '0x1D85186b5d9C12a6707D5fd3ac7133d58F437877');
    const contracs = [];

    contracs['0x1D85186b5d9C12a6707D5fd3ac7133d58F437877'] = new web3.eth.Contract(
      abi,
      '0x1D85186b5d9C12a6707D5fd3ac7133d58F437877'
    );
    contracs['0xd51bd30A91F88Dcf72Acd45c8A1E7aE0066263e8'] = new web3.eth.Contract(
      abi,
      '0xd51bd30A91F88Dcf72Acd45c8A1E7aE0066263e8'
    );
    contracs['0xc5228008C89DfB03937Ff5ff9124f0d7bd2028F9'] = new web3.eth.Contract(
      abi,
      '0xc5228008C89DfB03937Ff5ff9124f0d7bd2028F9'
    );

    return contracs[contract];
  }

  create(params) {
    console.log(
      'paramsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparamsparams:',
      params,
      JSON.stringify(params)
    );
    const { tokenAddress } = params;
    const data = this.encodeData(params);
    const recipients = [{ address: tokenAddress, amount: params.amount }];
    const newParams = { ...params, recipients, data };
    return super.create(newParams);
  }

  encodeData(params) {
    const data = this.getERC20Contract(params.tokenAddress)
      .methods.transferToOtherBlockchain(1, params.recipients[0].address)
      .encodeABI();
    return data;
  }
}
