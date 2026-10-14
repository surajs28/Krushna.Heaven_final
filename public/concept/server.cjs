const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ttf':'font/ttf'};
http.createServer((req,res)=>{
  const url = new URL(req.url,'http://localhost');
  let file = path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if (file!==root && !file.startsWith(root+path.sep)) {res.writeHead(403); return res.end('Forbidden');}
  if (file===root || url.pathname.endsWith('/')) file=path.join(file,'index.html');
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);});
}).listen(4210,'0.0.0.0',()=>console.log('Premium concept: http://localhost:4210'));
