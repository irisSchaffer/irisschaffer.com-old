FROM node:boron

ENV NODE_ENV production

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Bundle app source
COPY . .
RUN yarn build:render


CMD [ "node", "start.js" ]
