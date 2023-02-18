FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN apt update 
RUN curl -LO https://github.com/protocolbuffers/protobuf/releases/download/v3.15.8/protoc-3.15.8-linux-x86_64.zip
RUN unzip protoc-3.15.8-linux-x86_64.zip -d $HOME/.local
ENV PATH="$PATH:/root/.local/bin"
RUN npm run build
EXPOSE 50051

CMD ["npm", "start"]