import { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import PolicyConfigurator from '../components/PolicyConfigurator';
import TransactionFeed from '../components/TransactionFeed';

const RELAYER_URL = process.env.NEXT_PUBLIC_RELAYER_URL || 'http://localhost:3002';

interface PolicyConfig {
  agentPubKey: string;
  perTxCap: string;
  dailyLimit: string;
  epochLedgers: string;
}

export default function Home() {
  const [status, setStatus] = useState<string | null>(null);

  const handleConfigure = async (config: PolicyConfig) => {
    setStatus(`Configuring agent: ${config.agentPubKey}... (simulated — requires wallet interaction)`);
    setTimeout(() => setStatus(null), 3000);
  };

  const handleRevoke = async () => {
    setStatus('Revoking agent... (requires owner signature via wallet)');
    setTimeout(() => setStatus(null), 3000);
  };

  const handleEmergencyPanic = async (a: string, b: string) => {
    setStatus(`Emergency panic triggered by ${a.slice(0, 6)}... and ${b.slice(0, 6)}...`);
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: 24 }}>Agentic Escrow Control Center</h1>
        <WalletConnect />
      </header>

      {status && <div style={statusBarStyle}>{status}</div>}

      <main style={mainStyle}>
        <div style={{ flex: 1 }}>
          <PolicyConfigurator
            onConfigure={handleConfigure}
            onRevoke={handleRevoke}
            onEmergencyPanic={handleEmergencyPanic}
          />
          <div style={{ marginTop: 16 }}>
            <TransactionFeed relayerUrl={RELAYER_URL} />
          </div>
        </div>

        <aside style={asideStyle}>
          <h3 style={{ margin: '0 0 12px' }}>Contract Status</h3>
          <div style={statStyle}>
            <span>Escrow Contract</span>
            <span style={{ fontSize: 12, fontFamily: 'monospace' }}>
              {(process.env.NEXT_PUBLIC_ESCROW_CONTRACT || '').slice(0, 8)}...
            </span>
          </div>
          <div style={statStyle}>
            <span>Network</span>
            <span>{process.env.NEXT_PUBLIC_NETWORK || 'TESTNET'}</span>
          </div>
          <div style={statStyle}>
            <span>Relayer</span>
            <span style={{ fontSize: 12 }}>{RELAYER_URL}</span>
          </div>
          <p style={{ marginTop: 20, fontSize: 12, color: '#888' }}>
            Configure agent policy and monitor spending. Connect with Freighter wallet to sign on-chain actions.
          </p>
        </aside>
      </main>
    </div>
  );
}

const containerStyle: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: 20 };
const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 0',
  borderBottom: '1px solid #333',
  marginBottom: 20,
};
const statusBarStyle: React.CSSProperties = {
  background: '#1a3a1a',
  border: '1px solid #2a5a2a',
  padding: '8px 16px',
  borderRadius: 6,
  marginBottom: 16,
  fontSize: 14,
};
const mainStyle: React.CSSProperties = { display: 'flex', gap: 24 };
const asideStyle: React.CSSProperties = {
  width: 280,
  background: '#16213e',
  border: '1px solid #333',
  borderRadius: 8,
  padding: 20,
  height: 'fit-content',
};
const statStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: 13,
  padding: '6px 0',
  borderBottom: '1px solid #222',
};
