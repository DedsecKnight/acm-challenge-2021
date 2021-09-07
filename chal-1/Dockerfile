FROM node:12.18.3-alpine

WORKDIR /usr/app

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install

COPY ./ ./

ENV MONGO_URI="mongodb://db:27017/tags_db"
ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "run", "start"]