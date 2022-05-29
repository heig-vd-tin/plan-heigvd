FROM node:16
WORKDIR /usr/src/app
COPY ./03_code/server/package*.json ./
RUN npm install
COPY ./03_code/server/server.js ./
COPY ./03_code/frontend/dist ./dist
EXPOSE 3000
CMD [ "node", "server.js" ]