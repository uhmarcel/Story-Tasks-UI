FROM node:latest as builder
COPY package.json package-lock.json ./
RUN npm install && mkdir /app && mv ./node_modules ./app
WORKDIR /app
COPY . .
RUN  node --max_old_space_size=1536 ./node_modules/@angular/cli/bin/ng build --prod

FROM nginx:alpine
ADD https://github.com/kyubisation/angular-server-side-configuration/releases/download/v11.0.2/ngssc_64bit /usr/sbin/ngssc
RUN chmod +x /usr/sbin/ngssc
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/story-tasks-ui /usr/share/nginx/html
COPY start.sh start.sh
RUN chmod +x ./start.sh
CMD ["./start.sh"]
