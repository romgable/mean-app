FROM node:10-alpine AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
RUN npm run build -- --output-path=/usr/src/app/dist/out --prod
FROM nginx:1.16.0-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/src/app/dist/out /usr/share/nginx/html
COPY ./angular-nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
