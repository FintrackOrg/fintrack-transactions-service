FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV PATH="$PATH:/root/.local/bin"
RUN apt update && \
    curl -LO https://github.com/protocolbuffers/protobuf/releases/download/v3.15.8/protoc-3.15.8-linux-x86_64.zip && \
    unzip protoc-3.15.8-linux-x86_64.zip -d $HOME/.local && \
    npm run build && \
    apt clean
EXPOSE 50051

CMD ["npm", "start"]
