import http from "node:http";
import url from "node:url";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  res.setHeader("Content-Type", "application/json");

  switch (parsedUrl.pathname) {
    case "/":
      res.setHeader("Content-Type", "text/plain");
      res.end("Servidor está online");
      break;
    case "/ping":
      res.setHeader("Content-Type", "text/plain");
      res.end("pong");
      break;
    case "/json":
      res.end(JSON.stringify({ mensagem: "Olá, mundo!" }));
      break;
    case "/dados":
      res.end(
        JSON.stringify({
          id: 1,
          nome: "Nathan",
          idade: 22,
          cidade: "Recife",
        })
      );
      break;
    case "/status":
      res.end(
        JSON.stringify({
          status: "ok",
          uptime: process.uptime(),
        })
      );
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Rota não encontrada");
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🟢 Servidor Node.js rodando em http://localhost:${PORT}`);
});
