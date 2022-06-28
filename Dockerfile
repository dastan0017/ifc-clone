FROM node:12.14.1-alpine as build
WORKDIR /app
COPY app .

RUN npm install

RUN npm run build

#Nginx stage
FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/50x.html /usr/share/nginx/html/50x.html
COPY --from=build /app/build /usr/share/nginx/html 
EXPOSE 80