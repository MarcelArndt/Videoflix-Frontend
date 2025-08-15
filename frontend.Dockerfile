FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production


FROM nginx:alpine
COPY --from=build /app/dist/videoflix/browser/ /usr/share/nginx/html
COPY videoflix-nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]