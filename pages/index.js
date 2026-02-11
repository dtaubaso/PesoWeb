import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkWeight = async () => {
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
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <h1>Medidor de HTML</h1>
      <input 
        type="text" 
        placeholder="https://ejemplo.com" 
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={checkWeight} disabled={loading} style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
        {loading ? 'Calculando...' : 'Medir Peso'}
      </button>

      {result && (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <p>Peso del HTML: <strong>{result.mb} MB</strong></p>
          <div style={{ 
            height: '10px', 
            width: '100%', 
            backgroundColor: '#eee', 
            borderRadius: '5px',
            overflow: 'hidden' 
          }}>
            <div style={{ 
              height: '100%', 
              width: `${Math.min((result.mb / 2) * 100, 100)}%`, 
              backgroundColor: result.mb > 2 ? '#ff4d4d' : '#4caf50' 
            }} />
          </div>
          <p style={{ color: result.mb > 2 ? 'red' : 'green', fontWeight: 'bold', marginTop: '10px' }}>
            {result.mb > 2 ? '⚠️ Te pasaste de los 2 MB' : '✅ Peso aceptable'}
          </p>
        </div>
      )}
    </div>
  );
}
