# stage: build
FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# stage: serve
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/dist/craftworks-challenge /usr/share/nginx/html
