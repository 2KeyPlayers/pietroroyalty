# Pietro Royalty

Pietro Roaylty

## Initial setup

1. `npm init`
2. `npm install node-sass --save-dev`
3. `npm install bulma --save-dev`
4. Add scripts to `package.json`:
   ```
   "css-build": "node-sass --omit-source-map-url sass/styles.scss css/styles.css",
   "css-watch": "npm run css-build -- --watch",
   "start": "npm run css-watch"
   ```

## Installation

1. Run `[sudo] npm install -g http-server` to install HTTP Server globally.
2. Run `npm install` to install all dependencies.

## Customize

1. Bulma can be customized by adapting these [variables](https://bulma.io/documentation/customize/variables/).
2. Run `npm run css-build`.
3. To watch for changes, launch `npm start`.

## Run

Run `npm http-server -p 8080` or `npx http-server -p 8080` without installing it globally.
