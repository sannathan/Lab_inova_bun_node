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
macOS, Linux e WSL:
```sh
curl -fsSL https://bun.sh/install | bash
```
Windows:
```sh
powershell -c "irm bun.sh/install.ps1|iex"
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
```

Verificar instalação:
```sh
pnpm -v
```

---

### 🔹 2. Executar os Servidores
#### Rodar o servidor Bun:
```sh
cd bun-server
bun run serverBun.ts
```

#### Rodar o servidor Node.js:
```sh
cd node-server
node serverNode.js
```

---

### 🔹 3. Benchmarking
Para comparar a performance dos servidores, utilize **Autocannon**:
```sh
autocannon -c 100 -d 10 http://localhost:3000
```
Para o servidor bun use a porta 3000 e para o servidor node, utilize a 3001

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

### 🔹 5. Resultados
Comparação de velocidade de testes utilizando o autocannon:

#### 🔹 5.1 Bun

```sh
autocannon -c 100 -d 10 http://localhost:3000
Running 10s test @ http://localhost:3000
100 connections


┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max   │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼───────┤
│ Latency │ 0 ms │ 1 ms │ 1 ms  │ 2 ms │ 0.91 ms │ 0.45 ms │ 28 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴───────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬──────────┬──────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg      │ Stdev    │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼──────────┼─────────┤
│ Req/Sec   │ 80.575  │ 80.575  │ 87.871  │ 94.911  │ 87.916,8 │ 4.933,47 │ 80.560  │
├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼──────────┼─────────┤
│ Bytes/Sec │ 11.5 MB │ 11.5 MB │ 12.6 MB │ 13.6 MB │ 12.6 MB  │ 706 kB   │ 11.5 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴──────────┴──────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 10

879k requests in 10.03s, 126 MB read
```

#### 🔹 5.2 Node.js

```sh
autocannon -c 100 -d 10 http://localhost:3001
Running 10s test @ http://localhost:3001
100 connections


┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max    │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼────────┤
│ Latency │ 1 ms │ 1 ms │ 2 ms  │ 3 ms │ 1.07 ms │ 0.92 ms │ 173 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬───────────┬──────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg       │ Stdev    │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────────┼──────────┼─────────┤
│ Req/Sec   │ 53.119  │ 53.119  │ 65.919  │ 67.199  │ 64.609,46 │ 3.794,34 │ 53.103  │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────────┼──────────┼─────────┤
│ Bytes/Sec │ 9.03 MB │ 9.03 MB │ 11.2 MB │ 11.4 MB │ 11 MB     │ 646 kB   │ 9.03 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴───────────┴──────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 11

711k requests in 11.02s, 121 MB read
``` 

