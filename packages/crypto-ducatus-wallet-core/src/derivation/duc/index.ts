const DucatusLib = require('ducatuscore-lib');
import { IDeriver } from '..';
export abstract class AbstractDucatuscoreLibDeriver implements IDeriver {
  public abstract bitcoreLib;

  deriveAddress(network, pubKey, addressIndex, isChange) {
    const xpub = new this.bitcoreLib.HDPublicKey(pubKey, network);
    const changeNum = isChange ? 1 : 0;
    const path = `m/${changeNum}/${addressIndex}`;
    return this.bitcoreLib.Address(xpub.derive(path).publicKey, network).toString();
  }

  derivePrivateKey(network, xPriv, addressIndex, isChange) {
    const xpriv = new DucatusLib.HDPrivateKey(xPriv, network);
    const changeNum = isChange ? 1 : 0;
    const path = `m/${changeNum}/${addressIndex}`;
    const privKey = xpriv.derive(path).privateKey;
    const pubKey = privKey.publicKey;
    const address = this.bitcoreLib.Address(pubKey, network).toString();
    return { address, privKey: privKey.toString(), pubKey: pubKey.toString() };
  }
}
export class DucDeriver extends AbstractDucatuscoreLibDeriver {
  bitcoreLib = DucatusLib;
}
