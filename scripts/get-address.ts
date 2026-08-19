import { WebSocket } from 'ws';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { getConfig } from '../src/config.js';
import { MidnightWalletProvider, syncWallet } from '../src/wallet.js';
import pino from 'pino';

globalThis.WebSocket = WebSocket;

const logger = pino({ level: 'info', transport: { target: 'pino-pretty' } });
const config = getConfig();
const seed = process.env['MIDNIGHT_PREPROD_SEED'];
if (!seed) throw new Error('MIDNIGHT_PREPROD_SEED required');

setNetworkId(config.networkId);

const wallet = await MidnightWalletProvider.build(logger, {
  walletNetworkId: config.networkId,
  networkId: config.networkId,
  indexer: config.indexer,
  indexerWS: config.indexerWS,
  node: config.node,
  nodeWS: config.nodeWS,
  faucet: config.faucet,
  proofServer: config.proofServer,
}, { kind: 'seed', value: seed });

await wallet.start();
await syncWallet(logger, wallet.wallet, 60_000);

const addresses = wallet.wallet.addresses();
console.log('WALLET ADDRESS:', addresses[0]);

await wallet.stop();
process.exit(0);
