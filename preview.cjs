const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'public');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.ttf':'font/ttf'};
http.createServer((req,res)=>{let file;try{file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));}catch{res.writeHead(400);return res.end('Bad request');}if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}if(file===root||req.url.endsWith('/'))file=path.join(file,'index.html');fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);});}).listen(4188,'127.0.0.1',()=>console.log('Mr Gelato preview: http://localhost:4188'));

