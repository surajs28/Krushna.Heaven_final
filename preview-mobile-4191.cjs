const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "public");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
};

http
  .createServer((req, res) => {
    let file;
    try {
      const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      file = path.resolve(root, `.${pathname}`);
    } catch {
      res.writeHead(400);
      return res.end("Bad request");
    }

    if (file !== root && !file.startsWith(`${root}${path.sep}`)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }

    if (file === root || req.url.endsWith("/")) file = path.join(file, "index.html");

    fs.readFile(file, (error, data) => {
      if (error) {
        res.writeHead(404);
        return res.end("Not found");
      }

      res.writeHead(200, {
        "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(data);
    });
  })
  .listen(4191, "0.0.0.0", () => {
    console.log("Mr Gelato mobile preview: http://10.10.128.51:4191");
  });
