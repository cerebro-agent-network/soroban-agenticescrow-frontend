import { useFreighter } from '../hooks/useFreighter';

export default function WalletConnect() {
  const { address, connected, error, connect } = useFreighter();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {connected && address ? (
        <span style={{ fontSize: 14, fontFamily: 'monospace' }}>
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      ) : (
        <button onClick={connect} style={btnStyle}>
          Connect Freighter
        </button>
      )}
      {error && <span style={{ color: 'red', fontSize: 12 }}>{error}</span>}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: '8px 16px',
  background: '#1a1a2e',
  color: '#e0e0e0',
  border: '1px solid #555',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14,
};
