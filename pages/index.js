import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkWeight = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/weight?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      alert("Error al medir la URL");
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      maxWidth: '500px', 
      margin: 'auto',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>PesaURL</h1>
        
        <input 
          type="text" 
          placeholder="Ej: infobae.com" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '12px', 
            marginBottom: '10px', 
            borderRadius: '6px', 
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
        
        <button 
          onClick={checkWeight} 
          disabled={loading} 
          style={{ 
            width: '100%', 
            padding: '12px', 
            cursor: 'pointer', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Calculando...' : 'Medir Peso HTML'}
        </button>

        {result && (
          <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '18px' }}>Peso del HTML: <strong>{result.mb} MB</strong></p>
            
            {/* Barra de progreso */}
            <div style={{ 
              height: '12px', 
              width: '100%', 
              backgroundColor: '#eee', 
              borderRadius: '6px',
              overflow: 'hidden',
              marginTop: '10px'
            }}>
              <div style={{ 
                height: '100%', 
                width: `${Math.min((result.mb / 2) * 100, 100)}%`, 
                backgroundColor: result.mb > 2 ? '#ff4d4d' : '#0070f3',
                transition: 'width 0.5s ease-in-out'
              }} />
            </div>
            
            <p style={{ 
              color: result.mb > 2 ? '#d32f2f' : '#2e7d32', 
              fontWeight: 'bold', 
              marginTop: '15px',
              textAlign: 'center'
            }}>
              {result.mb > 2 ? '⚠️ ¡Atención! Se pasó de los 2 MB' : '✅ ¡Perfecto! Está bajo los 2 MB'}
            </p>
          </div>
        )}
      </div>

      {/* Tu firma con el link a LinkedIn */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '20px 0', 
        fontSize: '14px', 
        color: '#666',
        borderTop: '1px solid #eee' 
      }}>
        Creado por <a 
          href="https://www.linkedin.com/in/dtaubaso/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#0070f3', textDecoration: 'none', fontWeight: '500' }}
        >
          Damian Taubaso
        </a>
      </footer>
    </div>
  );
}
