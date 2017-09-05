FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/

RUN yarn install
RUN yarn build:render

# Bundle app source
COPY . /usr/src/app

CMD [ "node", "start.js" ]
