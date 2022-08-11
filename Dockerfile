FROM node:14.20.0-slim

WORKDIR /usr/src/app

COPY . .

RUN npm ci --omit=dev --ignore-scripts

EXPOSE 3000

CMD ["node", "src/index.js"]
