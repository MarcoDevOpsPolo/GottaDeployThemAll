FROM node:20-alpine3.20

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

CMD ["npm", "start"]
