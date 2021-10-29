FROM node:17 as build

COPY ./ /project-megaphone

WORKDIR /project-megaphone

RUN npm ci
RUN npm run build-prod

FROM nginx:stable-alpine

COPY --from=build /project-megaphone/dist/ /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
