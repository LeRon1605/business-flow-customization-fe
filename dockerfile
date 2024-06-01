FROM node:18-alpine AS build

WORKDIR /dist/src/app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:1.21.3-alpine AS ngi
COPY --from=build /dist/src/app/dist/business-flow-executor/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80