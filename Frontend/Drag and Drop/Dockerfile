# Stage 1: Build frontend
FROM node:21 AS frontend-builder

WORKDIR /app

COPY . .

RUN npm i

# Stage 2: Run frontend
FROM node:21-slim
WORKDIR /app

COPY --from=frontend-builder /app .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
