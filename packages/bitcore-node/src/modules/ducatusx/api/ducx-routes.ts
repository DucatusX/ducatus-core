import { Router } from 'express';
import logger from '../../../logger';
import { ETH } from '../../ethereum/api/csp';
export const DucxRoutes = Router();

DucxRoutes.get('/api/DUCX/:network/address/:address/txs/count', async (req, res) => {
  let { address, network } = req.params;
  try {
    const nonce = await ETH.getAccountNonce(network, address);
    res.json({ nonce });
  } catch (err) {
    logger.error('Nonce Error::' + err);
    res.status(500).send(err);
  }
});

DucxRoutes.post('/api/DUCX/:network/gas', async (req, res) => {
  const { from, to, value, data, gasPrice } = req.body;
  const { network } = req.params;
  try {
    const gasLimit = await ETH.estimateGas({ network, from, to, value, data, gasPrice });
    res.json(gasLimit);
  } catch (err) {
    res.status(500).send(err);
  }
});

DucxRoutes.get('/api/DUCX/:network/token/:tokenAddress', async (req, res) => {
  const { network, tokenAddress } = req.params;
  try {
    const tokenInfo = await ETH.getERC20TokenInfo(network, tokenAddress);
    res.json(tokenInfo);
  } catch (err) {
    res.status(500).send(err);
  }
});