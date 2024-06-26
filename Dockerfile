FROM node:lts-alpine
#ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY . .

RUN npm install

#RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
