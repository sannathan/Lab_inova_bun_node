import { serve } from "bun";
import { readFile } from "fs/promises";

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // Define o caminho do arquivo HTML baseado na URL
    let filePath = `./public${url.pathname === "/" ? "/index.html" : `${url.pathname}.html`}`;

    try {
      // Lê o arquivo e retorna como resposta
      const content = await readFile(filePath, "utf8");
      return new Response(content, { headers: { "Content-Type": "text/html" } });
    } catch {
      // Se o arquivo não existir, retorna a página 404
      const notFound = await readFile("./public/404.html", "utf8");
      return new Response(notFound, { status: 404, headers: { "Content-Type": "text/html" } });
    }
  },
});

console.log("Servidor rodando em http://localhost:3000");
