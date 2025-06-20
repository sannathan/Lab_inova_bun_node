FROM oven/bun

WORKDIR /app

COPY . .

RUN bun install && bun add -d @types/bun

EXPOSE 3000

ENTRYPOINT [ "bun", "run", "serverBun.ts" ]
