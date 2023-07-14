FROM node:18-alpine as deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install


FROM node:18-alpine as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY --from=builder /app/dist ./dist

CMD [ "node","dist/anuncios" ]

# FROM node:latest as node
# WORKDIR /app
# COPY ./ /app/
# RUN npm install
# RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=runner /app/dist/anuncios /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
