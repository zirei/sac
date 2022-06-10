# Stage 1 - the build process
FROM node:14 as build-deps
WORKDIR /app
COPY . ./
RUN npm install

#add enviroment variables
ARG vehiculoApi='http://localhost:8082'
RUN npm run build --env=prod

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /app/dist/sacVehiculos /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]





