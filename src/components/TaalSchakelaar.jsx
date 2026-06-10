import { useTaal } from '../context/TaalContext';

export default function TaalSchakelaar() {
  const { taal, wisselTaal } = useTaal();

  return (
    <button
      type="button"
      onClick={wisselTaal}
      aria-label={taal === 'nl' ? 'Switch to English' : 'Schakel naar Nederlands'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        borderRadius: '20px',
        border: '1px solid #d3d1c7',
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '13px',
        fontWeight: 600,
        color: '#1a2744',
        letterSpacing: '0.5px',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#534ab7'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d3d1c7'; }}
    >
      <span style={{ opacity: taal === 'nl' ? 1 : 0.4 }}>NL</span>
      <span style={{ color: '#d3d1c7' }}>|</span>
      <span style={{ opacity: taal === 'en' ? 1 : 0.4 }}>EN</span>
    </button>
  );
}
