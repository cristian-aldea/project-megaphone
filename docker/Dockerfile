FROM node:16 as build

COPY ./ /project-megaphone

WORKDIR /project-megaphone

RUN npm ci
RUN npm run build-prod

FROM nginx:stable-alpine

COPY --from=build /project-megaphone/dist/ /usr/share/nginx/html

COPY docker/project-megaphone/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
