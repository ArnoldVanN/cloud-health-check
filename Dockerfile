FROM node:17.9.0-alpine

ENV APP_ROOT=/app
ENV NODE_ENV=production
WORKDIR ${APP_ROOT}

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
COPY . .
CMD [ "node", "." ]