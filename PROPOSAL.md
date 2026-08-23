# Product Proposal: Confidential DeFi Portfolio Rebalancer

## 1. What problem does your dApp solve?

Institutional DeFi investors need to prove portfolio compliance — risk limits, regulatory requirements, diversification rules — without revealing their actual holdings, trading strategies, or portfolio composition to anyone on-chain. Currently, proving compliance requires full disclosure, exposing sensitive financial data to competitors, MEV bots, and the public.

This dApp solves that by letting users generate zero-knowledge proofs that their portfolio meets specific criteria (e.g., "my portfolio has at least 30% in stablecoins" or "my total exposure to any single asset is below 20%") without revealing individual asset allocations or amounts.

## 2. How does your dApp use Midnight's privacy model?

The dApp leverages Midnight's Compact smart contracts and selective disclosure model:

- **Private State (Witness):** Portfolio data — asset types, amounts, allocation percentages — are kept as private witnesses in the user's local state, never committed to the blockchain.
- **Public State (Ledger):** Only the proof verification result (compliant/not compliant) and the compliance attestation are stored on-chain.
- **Selective Disclosure via `disclose()`:** Users choose exactly which compliance metrics to reveal. A portfolio might prove "meets risk limits" without disclosing the actual risk score or underlying positions.

This means an auditor or lending protocol can verify compliance on-chain while the investor's actual portfolio remains completely private.

## 3. Who is the target audience?

- **Institutional DeFi investors** who need to prove regulatory compliance without exposing trading strategies
- **Lending protocols** that require collateral health verification without seeing exact positions
- **DAOs and governance** that need to verify member eligibility or portfolio thresholds without doxxing members
- **Compliance auditors** who need cryptographic proof of compliance rather than trust-based reporting

## 4. What makes this approach unique or valuable?

- **Zero-knowledge compliance:** Unlike traditional DeFi dashboards that expose all positions, this provides cryptographic proof of compliance with zero data leakage.
- **Midnight-native:** Built from the ground up on Midnight's Compact language and privacy model, not bolted onto a transparent chain.
- **Practical utility:** Solves a real problem that currently limits institutional DeFi adoption — the tension between transparency requirements and competitive privacy.
- **Composable:** Compliance proofs can be verified by any on-chain contract, enabling privacy-preserving DeFi primitives like compliance-gated pools, private credit scoring, and confidential portfolio insurance.
