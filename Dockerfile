FROM node:22

RUN npm install -g typescript && \
    npm install -g ts-node

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT ["ts-node", "src/index.ts"]
