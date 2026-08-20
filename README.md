# Hello World on Midnight

A privacy-first Hello World dApp built on Midnight blockchain using Compact smart contracts.

**Live Demo:** https://aditya226-sharma.github.io/hello-world-midnight/

Built for [New Moon to Full: Monthly Moonshots on Midnight](https://www.risein.com/programs/new-moon-to-full-monthly-moonshots-on-midnight) program.

## Project Structure

```
midnight-moonshot/
├── contracts/
│   ├── hello-world.compact      # Compact smart contract
│   ├── managed/hello-world/     # Compiled contract artifacts
│   └── index.ts                 # Contract exports
├── src/
│   ├── config.ts                # Network configuration
│   ├── providers.ts             # Midnight providers
│   ├── wallet.ts                # Wallet integration
│   └── test/hw.test.ts          # Contract tests
├── frontend/
│   ├── src/
│   │   ├── App.tsx              # Main React app
│   │   ├── App.css              # Styles
│   │   ├── components/
│   │   │   ├── WalletConnect.tsx
│   │   │   └── ContractInteraction.tsx
│   │   ├── hooks/useMidnight.ts
│   │   └── __tests__/
│   │       ├── WalletConnect.test.tsx
│   │       └── ContractInteraction.test.tsx
│   └── package.json
├── .github/workflows/ci.yml     # CI/CD pipeline
├── compose.yml                  # Docker services
└── package.json
```

## Prerequisites

- Node.js >= 22.0.0
- Docker Desktop
- Compact compiler (installed via script)
- Lace or 1AM wallet extension (for Preprod/Mainnet)

## Setup

### 1. Install Compact Compiler

```bash
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
export PATH="$HOME/.local/bin:$PATH"
compact update
```

### 2. Install Backend Dependencies

```bash
corepack enable
corepack prepare yarn@1.22.22 --activate
yarn install
```

### 3. Compile the Contract

```bash
compact compile contracts/hello-world.compact contracts/managed/hello-world
```

### 4. Install Frontend Dependencies

```bash
cd frontend && npm install
```

## Local Development

### Start Local Devnet

```bash
yarn env:up
```

### Run Contract Tests

```bash
yarn test:local
```

### Run Frontend Dev Server

```bash
cd frontend && npm run dev
```

### Run Frontend Tests

```bash
cd frontend && npx vitest run
```

### Build Frontend

```bash
cd frontend && npx vite build
```

## Smart Contract

The `hello-world.compact` contract stores and retrieves messages on-chain:

```compact
pragma language_version 0.23;

export ledger message: Opaque<"string">;

export circuit storeMessage(newMessage: Opaque<"string">): [] {
  message = disclose(newMessage);
}
```

## Public State vs Private Witness (Privacy Claim)

Midnight uses a **dual-state architecture** separating public and private data:

- **Public State (Ledger):** The `message` field is declared with `export ledger`, making it publicly visible on the blockchain. Anyone can query the contract state and read the stored message. This is the data that gets committed to the chain's public ledger.

- **Private Witness:** In this contract, the `storeMessage` circuit takes a `newMessage` parameter that is processed privately. The `disclose()` function is the deliberate boundary between private and public — it's the only mechanism that reveals data. Without `disclose()`, the parameter would remain private. The witness (off-chain state) is never stored on-chain; only the result of `disclose()` becomes public.

**Observable Privacy Behavior:** When a user calls `storeMessage`, the message content is sent as a private witness. Only after `disclose()` is called does the message become visible on-chain. This demonstrates that data remains private by default on Midnight — you must explicitly choose to reveal it. A second call to `storeMessage` with a different message will overwrite the previous one, and the old message becomes inaccessible, proving that private state is not leaked.

This design demonstrates Midnight's core principle: **privacy is the default**. Data stays private unless you explicitly choose to disclose it using `disclose()`.

## Screenshots

### Compile Output
![Compile Output](docs/screenshots/compile-output.png)

### Contract Deployed (Local Devnet)
![Deploy Output](docs/screenshots/deploy-output.png)

### Frontend Tests Passing
![Tests](docs/screenshots/tests-passing.png)

## Initial Product Idea

**Hello World Messenger** — A privacy-first messaging dApp on Midnight where users can store encrypted messages on-chain. Messages are only visible to the sender and intended recipients using Midnight's selective disclosure. The contract demonstrates the fundamental building block: storing data with configurable privacy. Future iterations could add multi-party messaging, time-locked messages, and access-controlled message boards — all with privacy as the default, not an afterthought.

## Testing

- **Backend**: 2 tests (deploy + store message) using Vitest
- **Frontend**: 14 tests (wallet connect + contract interaction) using Vitest + Testing Library

```bash
# Run all tests
yarn test:local        # Backend (requires Docker)
cd frontend && npx vitest run  # Frontend
```

## CI/CD

GitHub Actions workflow runs on push/PR to main:
- TypeScript type checking
- Contract compilation
- Frontend tests + build

## Deployment to Preprod

1. Generate a wallet and fund it via the [Preprod faucet](https://midnight-tmnight-preprod.nethermind.dev/)
2. Create `.env.preprod` with your seed/mnemonic
3. Start proof server: `yarn proof:up`
4. Deploy: `yarn test:preprod`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Smart Contract | Compact Language (v0.25) |
| Compiler | Compact CLI (v0.33.0) |
| Runtime SDK | @midnight-ntwrk/midnight-js-protocol |
| Frontend | React + TypeScript + Vite |
| Wallet | Lace / 1AM (Midnight Beta) |
| Testing | Vitest |
| CI/CD | GitHub Actions |
| Network | Midnight Preprod |

## License

MIT
