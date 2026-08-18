import { useState } from 'react';

interface ContractInteractionProps {
  connected: boolean;
}

export function ContractInteraction({ connected }: ContractInteractionProps) {
  const [message, setMessage] = useState('');
  const [storedMessage, setStoredMessage] = useState('');
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStoreMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    try {
      // In production, this would call the Midnight contract via SDK
      // For now, we simulate the interaction
      console.log('Storing message:', message);
      setStoredMessage(message);
      setTxHash('0x' + Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16),
      ).join(''));
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReadMessage = async () => {
    setLoading(true);
    setError(null);
    try {
      // In production, this would query the contract state
      console.log('Reading message from contract');
      setStoredMessage(storedMessage || 'Hello World!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Read failed');
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="contract-interaction disabled">
        <h2>Smart Contract Interaction</h2>
        <p>Connect your wallet to interact with the Hello World contract.</p>
      </div>
    );
  }

  return (
    <div className="contract-interaction">
      <h2>Smart Contract Interaction</h2>

      <div className="contract-section">
        <h3>Store a Message</h3>
        <div className="input-group">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
            className="message-input"
          />
          <button
            onClick={handleStoreMessage}
            disabled={loading || !message.trim()}
            className="btn btn-store"
          >
            {loading ? 'Storing...' : 'Store Message'}
          </button>
        </div>
      </div>

      <div className="contract-section">
        <h3>Read Message</h3>
        <button onClick={handleReadMessage} disabled={loading} className="btn btn-read">
          {loading ? 'Reading...' : 'Read from Contract'}
        </button>
        {storedMessage && (
          <div className="message-display">
            <span className="message-label">Stored Message:</span>
            <span className="message-value">{storedMessage}</span>
          </div>
        )}
      </div>

      {txHash && (
        <div className="tx-result">
          <span className="tx-label">Transaction Hash:</span>
          <span className="tx-hash">{txHash}</span>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}
