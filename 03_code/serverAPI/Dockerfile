FROM node:16
WORKDIR /usr/src/app
COPY ./03_code/serverAPI/package*.json ./
RUN npm install
COPY ./03_code/serverAPI/index.js ./
EXPOSE 3001
CMD [ "node", "index.js" ]
