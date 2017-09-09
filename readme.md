# irisschaffer.com

Front-end of [irisschaffer.com](https://irisschaffer.com). [Prismic.io](prismic.io) serves as a CMS.

The project uses React with server side rendering. Redux is used for data handling, redux-saga for asynchronous side-effects. Everything is bundled with webpack :)
All content from the CMS is loaded into the local API, where it is cached and accessible through GraphQL syntax.

## Requirements

- [Node](https://nodejs.org/en/download) >= 6.0

## Install

```bash
$ npm install
```

```bash
$ cp .env.example .env
```

## Development

```bash
$ npm run develop # will start the development server on port 3000
```


```bash
$ PORT=4000 npm run develop # will start the development server on port 4000
```

## Production

```bash
$ npm run build
$ npm start
```

## Deploy

We use [zeit's now](https://zeit.co/) for deployment.

```bash
$ npm run deploy
$ now alias [latest-deploy] irisschaffer.com
```
