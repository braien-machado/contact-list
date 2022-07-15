FROM node:16-alpine

WORKDIR /app_backend

COPY package*.json /app_backend/

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]