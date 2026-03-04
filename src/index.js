const http = require("http");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "CI/CD pipeline to AWS ECS is running",
      timestamp: new Date().toISOString()
    })
  );
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});