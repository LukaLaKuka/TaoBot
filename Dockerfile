FROM node:20.11.1-alpine3.19

WORKDIR /app 

COPY package.json .env prisma tsconfig.json  ./
COPY src /app/src

RUN npm install
RUN npx prisma migrate dev 

CMD [ "npm", "start" ]