import { useState, useCallback } from 'react';

export interface MidnightState {
  connected: boolean;
  address: string | null;
  balance: string | null;
  network: string | null;
}

declare global {
  interface Window {
    midnight?: {
      isMidnight?: boolean;
      enable?: () => Promise<{ address: string; balance: string; network: string }>;
      disable?: () => Promise<void>;
      getAddress?: () => Promise<string>;
      getBalance?: () => Promise<string>;
      getNetwork?: () => Promise<string>;
    };
    lace?: {
      isLace?: boolean;
      enable?: () => Promise<{ address: string; balance: string; network: string }>;
      disable?: () => Promise<void>;
    };
  }
}

export function useMidnight() {
  const [state, setState] = useState<MidnightState>({
    connected: false,
    address: null,
    balance: null,
    network: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = window.midnight || window.lace;
      if (!provider) {
        throw new Error(
          'No Midnight wallet found. Please install Lace or 1AM wallet extension.',
        );
      }

      if (provider.enable) {
        const result = await provider.enable();
        setState({
          connected: true,
          address: result.address,
          balance: result.balance,
          network: result.network,
        });
      } else {
        throw new Error('Wallet provider does not support enable()');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    setLoading(true);
    try {
      const provider = window.midnight || window.lace;
      if (provider?.disable) {
        await provider.disable();
      }
      setState({
        connected: false,
        address: null,
        balance: null,
        network: null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshState = useCallback(async () => {
    try {
      const provider = window.midnight || window.lace;
      if (provider?.getAddress) {
        const address = await provider.getAddress();
        const balance = await provider.getBalance?.();
        const network = await provider.getNetwork?.();
        setState((prev) => ({
          ...prev,
          address: address || prev.address,
          balance: balance || prev.balance,
          network: network || prev.network,
        }));
      }
    } catch {
      // Silently fail on refresh
    }
  }, []);

  return { state, loading, error, connect, disconnect, refreshState };
}
