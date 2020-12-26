FROM node:14.9

WORKDIR /app

COPY package*.json ./

RUN npm install --save

COPY . .

CMD ["npm", "run", "start"]