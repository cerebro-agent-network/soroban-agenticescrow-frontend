import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={bodyStyle}>
      <Component {...pageProps} />
    </div>
  );
}

const bodyStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: '#0a0a1a',
  color: '#e0e0e0',
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  padding: 0,
  margin: 0,
};
