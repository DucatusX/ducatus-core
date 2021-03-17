import Web3 from 'web3';
import { DUCXTxProvider } from '../ducx';
import { ERC20Abi } from './abi';
export class DRC20TxProvider extends DUCXTxProvider {
  getERC20Contract(tokenContractAddress: string) {
    const web3 = new Web3();
    const contract = new web3.eth.Contract(ERC20Abi, tokenContractAddress);
    return contract;
  }

  create(params: {
    recipients: Array<{ address: string; amount: string }>;
    nonce: number;
    gasPrice: number;
    data: string;
    gasLimit: number;
    tokenAddress: string;
    chainId?: number;
  }) {
    const { tokenAddress } = params;
    const data = this.encodeData(params);
    const recipients = [{ address: tokenAddress, amount: '0' }];
    const newParams = { ...params, recipients, data };
    return super.create(newParams);
  }

  encodeData(params: { recipients: Array<{ address: string; amount: string }>; tokenAddress: string }) {
    const { tokenAddress } = params;
    const [{ address, amount }] = params.recipients;
    const amountStr = Number(amount).toLocaleString('en', { useGrouping: false });
    const data = this.getERC20Contract(tokenAddress)
      .methods.transfer(address, amountStr)
      .encodeABI();
    return data;
  }
}
