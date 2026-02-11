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
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f7',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ 
        backgroundColor: 'white',
        padding: '40px', 
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        maxWidth: '450px', 
        width: '100%'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '25px', color: '#1d1d1f' }}>PesaURL</h1>
        
        <input 
          type="text" 
          placeholder="Ej: infobae.com" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '12px', 
            marginBottom: '12px', 
            borderRadius: '8px', 
            border: '1px solid #d2d2d7',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        
        <button 
          onClick={checkWeight} 
          disabled={loading} 
          style={{ 
            width: '100%', 
            padding: '12px', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            backgroundColor: '#0071e3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          {loading ? 'Calculando...' : 'Medir Peso HTML'}
        </button>

        {result && (
          <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#fbfbfd', borderRadius: '12px', border: '1px solid #f2f2f2' }}>
            <p style={{ fontSize: '16px', margin: '0 0 10px 0' }}>Peso del HTML: <strong>{result.mb} MB</strong></p>
            
            <div style={{ 
              height: '8px', 
              width: '100%', 
              backgroundColor: '#e5e5e5', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                height: '100%', 
                width: `${Math.min((result.mb / 2) * 100, 100)}%`, 
                backgroundColor: result.mb > 2 ? '#ff3b30' : '#34c759',
                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            </div>
            
            <p style={{ 
              color: result.mb > 2 ? '#ff3b30' : '#34c759', 
              fontWeight: '600', 
              marginTop: '12px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {result.mb > 2 ? '⚠️ Excede el límite de 2 MB' : '✅ Dentro del límite de 2 MB'}
            </p>
          </div>
        )}

        <footer style={{ 
          textAlign: 'center', 
          marginTop: '30px', 
          paddingTop: '20px',
          fontSize: '13px', 
          color: '#86868b',
          borderTop: '1px solid #f2f2f2' 
        }}>
          Creado por <a 
            href="https://www.linkedin.com/in/dtaubaso/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#0071e3', textDecoration: 'none', fontWeight: '600' }}
          >
            Damian Taubaso
          </a>
        </footer>
      </div>
    </div>
  );
}
