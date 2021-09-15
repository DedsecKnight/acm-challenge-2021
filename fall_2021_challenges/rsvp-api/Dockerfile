FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY ./ ./

ENV CHOKIDAR_USEPOLLING=true
ENV CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
ENV CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
ENV REDIRECT_URI=http://localhost:3000/auth/redirect

CMD ["npm", "run", "dev"]