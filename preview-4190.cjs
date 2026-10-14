const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, 'public');
// 4190 is reserved for Sieve and can be blocked by browser port safety checks.
const port = Number(process.env.PORT || 4200);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css',
  '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};
http.createServer((req, res) => {
  let file;
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    file = path.resolve(root, '.' + pathname);
    if (pathname.endsWith('/')) file = path.join(file, 'index.html');
  } catch {
    res.writeHead(400); res.end('Bad request'); return;
  }
  if (!file.startsWith(root + path.sep)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) {
      res.writeHead(404); res.end('Not found'); return;
    }
    const headers = {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store', 'Accept-Ranges': 'bytes',
    };
    const range = req.headers.range?.match(/^bytes=(\d*)-(\d*)$/);
    let start = 0, end = stat.size - 1;
    if (range) {
      start = range[1] ? Number(range[1]) : Math.max(0, stat.size - Number(range[2]));
      end = range[1] && range[2] ? Math.min(Number(range[2]), end) : end;
      if (start > end || start >= stat.size) {
        res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
        res.end(); return;
      }
      headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
    }
    headers['Content-Length'] = end - start + 1;
    res.writeHead(range ? 206 : 200, headers);
    if (req.method === 'HEAD') { res.end(); return; }
    const stream = fs.createReadStream(file, { start, end });
    stream.on('error', () => res.destroy());
    res.on('close', () => stream.destroy());
    stream.pipe(res);
  });
}).listen(port, '0.0.0.0', () => console.log(`Krushna preview: http://localhost:${port}/`));


