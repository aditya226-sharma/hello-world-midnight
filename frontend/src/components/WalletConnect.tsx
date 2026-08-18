import type { MidnightState } from '../hooks/useMidnight';

interface WalletConnectProps {
  state: MidnightState;
  loading: boolean;
  error: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function WalletConnect({
  state,
  loading,
  error,
  onConnect,
  onDisconnect,
}: WalletConnectProps) {
  if (state.connected) {
    return (
      <div className="wallet-connected">
        <div className="wallet-info">
          <span className="wallet-label">Connected Wallet</span>
          <span className="wallet-address">
            {state.address?.slice(0, 8)}...{state.address?.slice(-6)}
          </span>
          {state.balance && (
            <span className="wallet-balance">Balance: {state.balance}</span>
          )}
          {state.network && (
            <span className="wallet-network">Network: {state.network}</span>
          )}
        </div>
        <button onClick={onDisconnect} disabled={loading} className="btn btn-disconnect">
          {loading ? 'Disconnecting...' : 'Disconnect'}
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-connect">
      <h2>Connect Your Wallet</h2>
      <p>Connect your Lace or 1AM wallet to interact with the Hello World contract on Midnight.</p>
      <button onClick={onConnect} disabled={loading} className="btn btn-connect">
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
