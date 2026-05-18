import { useState } from 'react';

interface PolicyConfig {
  agentPubKey: string;
  perTxCap: string;
  dailyLimit: string;
  epochLedgers: string;
}

interface Props {
  onConfigure: (config: PolicyConfig) => void;
  onRevoke: () => void;
  onEmergencyPanic: (a: string, b: string) => void;
}

export default function PolicyConfigurator({ onConfigure, onRevoke, onEmergencyPanic }: Props) {
  const [agent, setAgent] = useState('');
  const [perTxCap, setPerTxCap] = useState('10000000');
  const [dailyLimit, setDailyLimit] = useState('50000000');
  const [epochLedgers, setEpochLedgers] = useState('17280');
  const [panicA, setPanicA] = useState('');
  const [panicB, setPanicB] = useState('');

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 16px' }}>Agent Policy Configuration</h3>
      <div style={fieldStyle}>
        <label>AI Agent Public Key</label>
        <input value={agent} onChange={(e) => setAgent(e.target.value)} style={inputStyle} placeholder="G..." />
      </div>
      <div style={fieldStyle}>
        <label>Max Per-Transaction (base units)</label>
        <input value={perTxCap} onChange={(e) => setPerTxCap(e.target.value)} style={inputStyle} />
      </div>
      <div style={fieldStyle}>
        <label>Daily Epoch Limit (base units)</label>
        <input value={dailyLimit} onChange={(e) => setDailyLimit(e.target.value)} style={inputStyle} />
      </div>
      <div style={fieldStyle}>
        <label>Epoch Duration (ledgers, ~5s each)</label>
        <input value={epochLedgers} onChange={(e) => setEpochLedgers(e.target.value)} style={inputStyle} />
      </div>
      <button
        onClick={() => onConfigure({ agentPubKey: agent, perTxCap, dailyLimit, epochLedgers })}
        style={primaryBtnStyle}
      >
        Apply Policy
      </button>

      <hr style={{ margin: '16px 0', border: '1px solid #333' }} />

      <h4 style={{ margin: '0 0 8px' }}>Panic Controls</h4>
      <button onClick={onRevoke} style={dangerBtnStyle}>
        Revoke Agent (Owner Only)
      </button>

      <div style={{ ...fieldStyle, marginTop: 12 }}>
        <label>Emergency Panic — Multi-Sig Signer A</label>
        <input value={panicA} onChange={(e) => setPanicA(e.target.value)} style={inputStyle} placeholder="G..." />
      </div>
      <div style={fieldStyle}>
        <label>Emergency Panic — Multi-Sig Signer B</label>
        <input value={panicB} onChange={(e) => setPanicB(e.target.value)} style={inputStyle} placeholder="G..." />
      </div>
      <button onClick={() => onEmergencyPanic(panicA, panicB)} style={dangerBtnStyle}>
        Trigger Emergency Panic (2-of-3)
      </button>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#16213e',
  border: '1px solid #333',
  borderRadius: 8,
  padding: 20,
  marginBottom: 20,
};
const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 };
const inputStyle: React.CSSProperties = {
  padding: 8,
  background: '#0f3460',
  border: '1px solid #555',
  borderRadius: 4,
  color: '#e0e0e0',
  fontFamily: 'monospace',
};
const primaryBtnStyle: React.CSSProperties = {
  padding: '10px 20px',
  background: '#0f3460',
  color: '#e0e0e0',
  border: '1px solid #555',
  borderRadius: 6,
  cursor: 'pointer',
  width: '100%',
};
const dangerBtnStyle: React.CSSProperties = {
  padding: '10px 20px',
  background: '#5c0000',
  color: '#ff6666',
  border: '1px solid #a00',
  borderRadius: 6,
  cursor: 'pointer',
  width: '100%',
  marginBottom: 8,
};
