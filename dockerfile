FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm
RUN npm install --verbose
COPY . .
RUN npm run build


FROM nginx:alpine AS production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]