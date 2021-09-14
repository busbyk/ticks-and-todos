[![Netlify Status](https://api.netlify.com/api/v1/badges/b2799b7f-3b7d-4bdb-a1d1-0c1e367be780/deploy-status)](https://app.netlify.com/sites/ticks-and-todos/deploys)

# ticks-and-todos

A React app that displays notable climbs based on a user's Mountain Project ticks.

Utilizes (and depends on) the following API as the backend:

1. [mp-search-api](https://github.com/busbyk/mp-search-api)

## Getting Started

1. Create a `.env` file at the root of the project with the following contents:

```
REACT_APP_API_BASE_URL=http://localhost:5000/
```

You can run the [mp-search-api](https://github.com/busbyk/mp-search-api) at a different location and this env var should be updated accordingly.

1. Run `npm install`
1. Run `npm start`
