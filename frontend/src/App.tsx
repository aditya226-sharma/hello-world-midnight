import { WalletConnect } from './components/WalletConnect';
import { ContractInteraction } from './components/ContractInteraction';
import { useMidnight } from './hooks/useMidnight';
import './App.css';

function App() {
  const { state, loading, error, connect, disconnect } = useMidnight();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Hello World on Midnight</h1>
        <p className="subtitle">Privacy-First Smart Contract dApp</p>
      </header>

      <main className="app-main">
        <WalletConnect
          state={state}
          loading={loading}
          error={error}
          onConnect={connect}
          onDisconnect={disconnect}
        />

        <ContractInteraction connected={state.connected} />

        <section className="info-section">
          <h2>About This dApp</h2>
          <p>
            This is a Hello World decentralized application built on Midnight,
            a privacy-first blockchain. The smart contract stores and retrieves
            messages using zero-knowledge proofs.
          </p>
          <div className="tech-stack">
            <h3>Tech Stack</h3>
            <ul>
              <li><strong>Smart Contract:</strong> Compact Language (v0.25)</li>
              <li><strong>Frontend:</strong> React + TypeScript + Vite</li>
              <li><strong>Wallet:</strong> Lace / 1AM (Midnight Beta)</li>
              <li><strong>Network:</strong> Midnight Preprod</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Built for{' '}
          <a
            href="https://www.risein.com/programs/new-moon-to-full-monthly-moonshots-on-midnight"
            target="_blank"
            rel="noopener noreferrer"
          >
            New Moon to Full: Monthly Moonshots on Midnight
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
