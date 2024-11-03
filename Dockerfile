FROM node:alpine

WORKDIR /usr/src/email-microservice

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]