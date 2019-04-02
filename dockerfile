FROM node:11

WORKDIR /app

COPY package.json yarn.lock ormconfig.json ./
COPY packages/api/package.json packages/api/
COPY packages/common/package.json packages/common/

RUN yarn --frozen-lockfile

COPY packages/api packages/api
COPY packages/common packages/common

WORKDIR /app/packages/api

EXPOSE 4000
CMD ["yarn", "start"] 


