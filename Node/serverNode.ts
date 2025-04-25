import { createServer } from "http";
import { randomUUID } from "crypto";
import  Database  from "better-sqlite3"

const db = new Database("posts.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS post (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL
    )
`);

const server = createServer((req, res) => {
    const { method, url } = req;

    if(method === "GET" && url === "/api/posts"){
        const posts = db.prepare("SELECT * FROM posts").all();

        res.writeHead(200, {"Content-Type": "application/json" });
        res.end(JSON.stringify(posts));
    }
    else if (method === "POST" && url === "api/posts") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const { title, content } = JSON.parse(body);
            const id = randomUUID();
            const createdAt = new Date().toISOString();

            //Insere o novo post no banco de dados
            db.prepare(
                "INSERT INTO post (id, title, content, create_at) VALUES (?, ?, ?, ?)"
            ).run(id, title, content, createdAt);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ id, title, content, created_at: createdAt}));
        });
    }
    else {
        res.writeHead(404, {"Content-Type": "text/plain" });
        res.end("Rota não encontrada");
    }
})

server.listen(3002, () => {
    console.log("Servidor rodando na porta 3002");
});


