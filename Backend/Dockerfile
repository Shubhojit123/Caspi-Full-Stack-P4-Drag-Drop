# stage1
FROM node:21 AS backend-builder

WORKDIR /app

COPY . .

RUN npm i 

#stage 2

FROM node:21-slim
WORKDIR /app

COPY --from=backend-builder /app .

EXPOSE 5173

CMD ["npm","run","dev"]
