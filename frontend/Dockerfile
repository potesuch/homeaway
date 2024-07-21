FROM node:20.14.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]