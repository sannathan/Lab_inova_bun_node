# 🚀 Desenvolvimento e Deploy de Servidores HTTP com Bun e Node

## 📌 Objetivo
Este projeto tem como objetivo criar dois servidores HTTP idênticos utilizando **Bun** e **Node.js puro**. O foco é testar a viabilidade do Bun como runtime principal no **CITI**, comparando sua performance com o Node.js.

### ✅ Funcionalidades
- Servir arquivos JSON e respostas HTTP simples.
- Ser dockerizados para facilitar o deploy.
- Ser implantados em um **Droplet da Digital Ocean** utilizando **Docker Compose**.
- Ter o tráfego gerenciado por um **proxy reverso Nginx**.
- Passar por um **benchmarking** utilizando **Autocannon**.

---

## ⚙️ Estrutura do Projeto

```
📂 LAB_INOVA_BUN_NODE
├── 📂 bun-server        # Servidor HTTP usando Bun
├── 📂 node-server       # Servidor HTTP usando Node.js
├── 📂 nginx             # Configuração do proxy reverso
├── 📂 docker            # Dockerfiles e docker-compose
├── 📂 benchmarks        # Resultados do benchmarking
├── 📜 README.md         # Documentação do projeto
└── 📜 .gitignore        # Arquivos ignorados pelo Git
```

---

## 🛠️ Configuração e Instalação

### 🔹 1. Instalar Dependências
#### Instalar **Bun**:
```sh
curl -fsSL https://bun.sh/install | bash
```
Verificar instalação:
```sh
bun -v
```

#### Instalar **Node.js + pnpm**:
```sh
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
nvm install --lts
nvm use --lts
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
```

---

### 🔹 2. Executar os Servidores
#### Rodar o servidor Bun:
```sh
cd bun-server
bun run index.ts
```

#### Rodar o servidor Node.js:
```sh
cd node-server
pnpm start
```

---

### 🔹 3. Benchmarking
Para comparar a performance dos servidores, utilize **Autocannon**:
```sh
autocannon -c 100 -d 10 http://localhost:3000
```

---

### 🔹 4. Dockerização
Criar os containers para ambos os servidores:
```sh
docker-compose up --build -d
```

Verificar os containers rodando:
```sh
docker ps
```

