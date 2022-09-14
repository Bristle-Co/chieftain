FROM node:12-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json /app

# With the --production flag (or when the NODE_ENV environment variable is set to production ), npm will not install modules listed in devDependencies
RUN npm install --production

COPY . /app

RUN npm run build

# ENV PORT 3000
EXPOSE 3000
CMD [ "npm","run", "start" ]