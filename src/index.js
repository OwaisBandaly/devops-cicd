const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");

function sendFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal Server Error");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (req.url === "/" || req.url === "/index.html") {
    sendFile(res, path.join(publicDir, "index.html"), "text/html; charset=utf-8");
    return;
  }

  if (req.url === "/styles.css") {
    sendFile(res, path.join(publicDir, "styles.css"), "text/css; charset=utf-8");
    return;
  }

  if (req.url === "/app.js") {
    sendFile(res, path.join(publicDir, "app.js"), "application/javascript; charset=utf-8");
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});