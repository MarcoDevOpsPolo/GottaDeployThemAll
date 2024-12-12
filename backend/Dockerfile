FROM node:20-alpine3.20

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npx", "json-server", "--host", "0.0.0.0", "--watch", "pokemon.json"]
