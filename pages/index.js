import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkWeight = async () => {
    // Evita que la página se recargue al dar Enter
    if (e) e.preventDefault();
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
      <Head>
        <title>PesaURL | Medidor de peso HTML</title>
        <meta name="description" content="Mide el peso del HTML de cualquier web al instante" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚖️</text></svg>" />
      </Head>

      <div style={{ 
        backgroundColor: 'white',
        padding: '40px', 
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        maxWidth: '450px', 
        width: '100%'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '25px', color: '#1d1d1f', fontSize: '28px' }}>Cuánto pesa mi URL</h1>
        
        {/* Envolvemos en un FORM para habilitar el ENTER */}
        <form onSubmit={checkWeight}>
          <input 
            type="text" 
            placeholder="Ej: infobae.com" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '14px', 
              marginBottom: '15px', 
              borderRadius: '10px', 
              border: '1px solid #d2d2d7',
              fontSize: '16px',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
          
          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: '100%', 
              padding: '14px', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              backgroundColor: '#0071e3', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Calculando...' : 'Medir Peso HTML'}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fbfbfd', borderRadius: '14px', border: '1px solid #f2f2f2' }}>
            <p style={{ fontSize: '17px', margin: '0 0 12px 0', color: '#1d1d1f' }}>Peso del HTML: <strong>{result.mb} MB</strong></p>
            
            <div style={{ 
              height: '10px', 
              width: '100%', 
              backgroundColor: '#e5e5e5', 
              borderRadius: '5px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                height: '100%', 
                width: `${Math.min((result.mb / 2) * 100, 100)}%`, 
                backgroundColor: result.mb > 2 ? '#ff3b30' : '#34c759',
                transition: 'width 1s cubic-bezier(0.23, 1, 0.32, 1)'
              }} />
            </div>
            
            <p style={{ 
              color: result.mb > 2 ? '#ff3b30' : '#34c759', 
              fontWeight: '600', 
              marginTop: '15px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {result.mb > 2 ? '⚠️ ¡Atención! Se pasó de los 2 MB' : '✅ ¡Perfecto! Está bajo los 2 MB'}
            </p>
          </div>
        )}

        <footer style={{ 
          textAlign: 'center', 
          marginTop: '35px', 
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
