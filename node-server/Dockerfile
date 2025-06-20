FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

ENTRYPOINT ["node", "serverNode.js"]