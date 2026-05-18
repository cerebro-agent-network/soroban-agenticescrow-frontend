import { useState, useEffect, useCallback } from 'react';
import { isConnected, getAddress, signTransaction } from '@stellar/freighter-api';

export function useFreighter() {
  const [address, setAddress] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    try {
      const ok = await isConnected();
      if (!ok) {
        setError('Freighter extension not detected');
        return null;
      }
      const result = await getAddress();
      setAddress(result.address);
      setConnected(true);
      setError(null);
      return result.address;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'connection failed';
      setError(msg);
      return null;
    }
  }, []);

  const signAndSend = useCallback(async (xdr: string): Promise<string | null> => {
    try {
      const result = await signTransaction(xdr, {
        networkPassphrase:
          process.env.NEXT_PUBLIC_NETWORK === 'MAINNET'
            ? 'Public Global Stellar Network ; September 2015'
            : 'Test SDF Network ; September 2025',
      });
      return result.signedTxXdr;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'signing failed';
      setError(msg);
      return null;
    }
  }, []);

  useEffect(() => {
    connect();
  }, [connect]);

  return { address, connected, error, connect, signAndSend };
}
