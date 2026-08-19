# Rise In - New Moon to Full: Monthly Moonshots on Midnight
## Submission Materials

### GitHub Repo
**https://github.com/aditya226-sharma/hello-world-midnight**

---

## Level 1 - New Moon: Setup & First Contract

**GitHub Repo URL:** https://github.com/aditya226-sharma/hello-world-midnight

**Description:**
Setup the Midnight development environment (Node.js, Docker, Compact compiler v0.31.0), wrote a Compact smart contract (`hello-world.compact`) that stores and retrieves messages on-chain using the `storeMessage` circuit. Contract compiles successfully and deploys to local devnet.

**Contract:** `contracts/hello-world.compact`
```compact
pragma language_version 0.23;

export ledger message: Opaque<"string">;

export circuit storeMessage(newMessage: Opaque<"string">): [] {
  message = disclose(newMessage);
}
```

**Evidence:**
- Contract compiles: `compact compile contracts/hello-world.compact contracts/managed/hello-world`
- Backend tests pass (2/2) on local devnet
- Deployed contract address (local): `232420c614915f7f6a1a6d3f519a3a30262885651316d4b6cfb3932b67c8b597`

---

## Level 2 - Waxing Crescent: Frontend Integration

**Frontend:** React + TypeScript + Vite application with:
- `WalletConnect` component - Connect/disconnect Midnight wallet (Lace/1AM)
- `ContractInteraction` component - Store and read messages via the smart contract
- `useMidnight` hook - Wallet state management
- Dark-themed responsive UI

**Tech Stack:** React 19, TypeScript, Vite, Vitest, @testing-library/react

**Evidence:**
- Frontend builds: `npx vite build` (production build in `frontend/dist/`)
- 14 frontend tests pass (WalletConnect: 8, ContractInteraction: 6)

---

## Level 3 - First Quarter: Production-Grade dApp

**Test Suite:** 16 total tests (2 backend + 14 frontend)
- Backend: Vitest, tests contract deployment and storeMessage circuit
- Frontend: Vitest + Testing Library, tests wallet connect UI and contract interaction

**CI/CD:** GitHub Actions pipeline (`.github/workflows/ci.yml`)
- TypeScript type checking (backend + frontend)
- Contract compilation
- Frontend tests + production build

**Documentation:** Full README.md with project structure, setup instructions, and tech stack

**Evidence:**
- All 14 frontend tests pass: `npx vitest run`
- Both backend and frontend typecheck clean: `npx tsc --noEmit`
- CI/CD pipeline defined in `.github/workflows/ci.yml`

---

## Idea Submission - The Turn

**Problem:** Privacy-first messaging on blockchain
**Solution:** Hello World dApp demonstrating message storage with Midnight's selective disclosure
**User:** Anyone who wants to store encrypted messages on-chain with privacy guarantees

---

## Level 4 - Waxing Gibbous: MVP Goes Live

**Contract Address (Preprod):** [To be filled after deployment]
**Live Demo:** [To be filled after Vercel deployment]
**Product X Profile:** [To be created]

**Note:** Preprod deployment requires wallet funding via https://midnight-tmnight-preprod.nethermind.dev/

---

## Level 5 - Full Moon: Users & Feedback

**Feedback Channels:** GitHub Issues, direct messages
**Target:** 50 Preprod users
**Status:** [In progress]

---

## Level 6 - Supermoon: Mainnet Launch

**Status:** [Pending Level 5 completion]
