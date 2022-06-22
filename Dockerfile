FROM node:16

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm i --omit=dev

COPY ./ ./

CMD ["npm", "start"]