import { useEffect, useState } from 'react';

interface TxRecord {
  hash: string;
  destination: string;
  amount: string;
  purpose: string;
  timestamp: string;
}

interface Props {
  relayerUrl: string;
}

export default function TransactionFeed({ relayerUrl }: Props) {
  const [txs, setTxs] = useState<TxRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`${relayerUrl}/allowance`);
        const data = await res.json();
        setTxs((prev) => {
          const entry: TxRecord = {
            hash: `ledger-${Date.now()}`,
            destination: 'N/A',
            amount: data.remainingAllowance || '0',
            purpose: 'allowance-check',
            timestamp: new Date().toISOString(),
          };
          return [entry, ...prev].slice(0, 50);
        });
      } catch {
        // polling error — ignore
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
    const interval = setInterval(fetchFeed, 30000);
    return () => clearInterval(interval);
  }, [relayerUrl]);

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 16px' }}>Agent Transaction Feed</h3>
      {loading && <p style={{ color: '#888' }}>Loading...</p>}
      <div style={{ maxHeight: 400, overflowY: 'auto' }}>
        {txs.length === 0 && !loading && (
          <p style={{ color: '#888' }}>No transactions yet. Deposits and agent payments will appear here.</p>
        )}
        {txs.map((tx, i) => (
          <div key={`${tx.hash}-${i}`} style={rowStyle}>
            <div style={{ fontSize: 12, fontFamily: 'monospace', color: '#aaa' }}>
              <span>Purpose: {tx.purpose}</span>
              <span style={{ marginLeft: 16 }}>Amount: {tx.amount}</span>
              <span style={{ marginLeft: 16 }}>{new Date(tx.timestamp).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#16213e',
  border: '1px solid #333',
  borderRadius: 8,
  padding: 20,
};
const rowStyle: React.CSSProperties = {
  padding: '8px 0',
  borderBottom: '1px solid #222',
};
