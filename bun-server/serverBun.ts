const server = Bun.serve({
  port: 3000,
  routes: {
    "/": {
      GET: () => new Response("Servidor está funcionado!!")
    },
    "/ping": {
      GET: () => new Response("pong!")
    },
    "/json": {
      GET: () => {return Response.json({"mensagem": "Olá, Mundo!"})}
    },
    "/dados": {
      GET:  () => { return Response.json({"id": 1, "nome": "Nathan"})}
    },
    "/status": {
      GET: () => {
        return Response.json({ "status": "ok", "uptime": process.uptime()})
      }
    }
  },
});

console.log(`Servidor rodando na porta: ${server.url}`)