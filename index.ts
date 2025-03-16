import { serve } from "bun";
import homepage from "./public/index.html"
import about from "./public/about.html"

serve({
  port: 3000,
  routes:{
    "/": homepage,
    "/about": about
  }
});

console.log("Servidor rodando em http://localhost:3000");
