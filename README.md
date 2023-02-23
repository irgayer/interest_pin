# Install packages

```bash
npm i
```

## Running

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## About project

This is simple pinterest clone. Users can create posts and collections. Post is a image with title and description.
And collection is array of posts with title. Users can subscribe other users' collections and full-copy them as well.
By default, when user is creating collection, they is automatically subscribed to it and can not change that behavior.

## Project stack

I used SvelteKit. It is framework based on nodejs. Svelte supports backend and frontend development what called 'SSR' or can be used as 'SPA'. I combined different techniques such as default server-side rendering for pages and api calls for basic functionalities.

## DB parts

```js
db.posts.createIndex({themes: -1}, {name: 'query index for themes'})
```

This index for themes is very useful when it comes to sort and display top 10 themes.

Almost every query contains some sort of aggregations. e.g. lookup, limit, sort, skip, unwind etc.

In the addition, I declined idea about telemetry of users because there is no time for it :).

ZXC