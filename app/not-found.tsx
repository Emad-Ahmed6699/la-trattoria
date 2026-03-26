import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#F9F6F0',
      color: '#554246',
    }}>
      <h1 style={{ fontSize: '3rem', margin: '20px 0', color: '#7A1F3F' }}>
        404
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        Page Not Found
      </p>
      <Link
        href="/"
        style={{
          padding: '10px 20px',
          backgroundColor: '#7A1F3F',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Return to Home
      </Link>
    </div>
  );
}
