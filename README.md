# DucatusCore

<p align="center">
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/DUCATUS-revival/ducatus-core">
  <a href="https://opensource.org/licenses/MIT/" target="_blank"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-blue.svg" style="display: inherit;"/></a>
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/DUCATUS-revival/ducatus-core">
</p>
  
**Infrastructure to build Bitcoin and blockchain-based applications for the next generation of financial technology.**

## Getting Started

### Requirements

- Trusted P2P Peer
- MongoDB Server >= v3.4
- make g++ gcc 
- node.js = v10.24.1
### Checkout the repo

```sh
git clone git@github.com:DUCATUS-revival/ducatus-core.git
git checkout master
npm install
```
## Setup Guide

### 1. Setup Bitcore config

<details>
<summary>Example bitcore.config.json</summary>
<br>

```json
{
  "bitcoreNode": {
    "chains": {
      "BTC": {
        "mainnet": {
          "chainSource": "p2p",
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 20008
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 20009,
            "username": "username",
            "password": "password"
          }
        },
        "regtest": {
          "chainSource": "p2p",
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 20020
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 20021,
            "username": "username",
            "password": "password"
          }
        }
      },
      "BCH": {
        "mainnet": {
          "parentChain": "BTC",
          "forkHeight": 478558,
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 30008
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 30009,
            "username": "username",
            "password": "password"
          }
        },
        "regtest": {
          "chainSource": "p2p",
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 30020
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 30021,
            "username": "username",
            "password": "password"
          }
        }
      }
    }
  }
}
```

</details>

### 2. Setup Bitcoin Node

<details>
<summary>Example Bitcoin Mainnet Config</summary>

```sh
whitelist=127.0.0.1
txindex=0
listen=1
server=1
irc=1
upnp=1

# Make sure port & rpcport matches the
# bitcore.config.json ports for BTC mainnet

# if using Bitcoin Core v0.17+ prefix
# [main]

port=20008
rpcport=20009
rpcallowip=127.0.0.1

rpcuser=username
rpcpassword=password
```

</details>

### 3. Run Bitcoin node

<details>
<summary>Example Starting a Bitcoin Node</summary>

```sh
# Path to your bitcoin application and path to the config above
/Applications/Bitcoin-Qt.app/Contents/MacOS/Bitcoin-Qt -datadir=/Users/username/blockchains/bitcoin-core/networks/mainnet/
```

</details>

### 4. Start Bitcore
```sh
npm run node
```

## Applications
- [DucatusCore Node](packages/bitcore-node) - A full node with extended capabilities using Ducatus Core
- [DucatusCore Wallet](packages/bitcore-wallet) - A command-line based wallet client
- [DucatusCore Wallet Client](packages/ducatus-bitcore-wallet-client) - A client for the wallet service
- [DucatusCore Wallet Service](packages/ducatus-bitcore-wallet-service) - A multisig HD service for wallets
- [DucatusCore Wallet 3.0](https://github.com/DUCATUS-revival/ducatus-wallet) - An easy-to-use, multiplatform, multisignature, secure bitcoin wallet
- [Insight](packages/insight) - A blockchain explorer web user interface

## Libraries
- [Bitcore Channel](https://github.com/bitpay/bitcore-channel) - Micropayment channels for rapidly adjusting bitcoin transactions
- [Bitcore ECIES](https://github.com/bitpay/bitcore-ecies) - Uses ECIES symmetric key negotiation from public keys to encrypt arbitrarily long data streams
- [Bitcore Lib](packages/bitcore-lib) - A pure and powerful JavaScript Bitcoin library
- [Bitcore Lib Cash](packages/bitcore-lib-cash) - A pure and powerful JavaScript Bitcoin Cash library
- [Bitcore Message](https://github.com/bitpay/bitcore-message) - Bitcoin message verification and signing
- [Bitcore Mnemonic](packages/bitcore-mnemonic) - Implements mnemonic code for generating deterministic keys
- [Bitcore P2P](packages/bitcore-p2p) - The peer-to-peer networking protocol for BTC
- [Bitcore P2P Cash](packages/bitcore-p2p-cash) - The peer-to-peer networking protocol for BCH
- [Crypto Wallet Core](packages/ducatus-crypto-wallet-core) - A coin-agnostic wallet library for creating transactions, signing, and address derivation
- [DucatusCore Lib](packages/ducatus-bitcore-lib) - A pure and powerful JavaScript Ducatus library
- [DucatusCore P2P](packages/ducatus-bitcore-p2p) - The peer-to-peer networking protocol for Ducatus

## Extras
- [Bitcore Build](packages/bitcore-build) - A helper to add tasks to gulp
- [Bitcore Client](packages/bitcore-client) - A helper to create a wallet using the bitcore-v8 infrastructure

## License
Code released under [the MIT license](https://github.com/DUCATUS-revival/ducatus-core/blob/master/LICENSE).

Copyright 2022 Ducatus.