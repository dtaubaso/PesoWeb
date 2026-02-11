export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL requerida" });

  try {
    const response = await fetch(url.startsWith('http') ? url : `https://${url}`);
    const html = await response.text();
    
    // Calculamos el tamaño en bytes y convertimos a MB
    const bytes = Buffer.byteLength(html, 'utf8');
    const mb = (bytes / (1024 * 1024)).toFixed(2);

    res.status(200).json({ mb: parseFloat(mb) });
  } catch (error) {
    res.status(500).json({ error: "No se pudo acceder a la URL" });
  }
}
