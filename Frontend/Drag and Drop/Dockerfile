FROM node:21

WORKDIR /app

COPY . .

RUN npm i 

EXPOSE 5173

CMD ["npm","run","dev","--","--host","0.0.0.0"]
