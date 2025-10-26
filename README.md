# MOCKBUSTER

A small website that displays movies from TMDB and lets you add them to a watchlist.

## Running the project
### .env file

Create a `.env` file to the root of the project with the following content:
```
BASE_URL=/
PORT=5174 # server port number
TMDB_API_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Replace the contents of the `TMDB_API_TOKEN` with the value of your API read access token. If you don't have a TMDB account, you can create one in the link: https://www.themoviedb.org/signup and then follow the instructions on https://developer.themoviedb.org/docs/getting-started 

Obs: There is a `.env.example` file to copy the contents from if you prefer

### Running the scripts 

Requirements `Node >=24`, `npm >=11`, a TMDB API token.

**Important**: All commamnds should be run from the root of the project

Install the dependencies with `npm install`
After the dependecies are installed and the `.env` file is in place, you can run the following commands:

`npm run dev` - development mode to run in localhost (default port is 5174)

Build: `npm run build` - buils the app

`npm run preview` - Runs the bundled app

`npm run storybook` - Storybook ui library

`npm run e2e` - Playwright tests with

