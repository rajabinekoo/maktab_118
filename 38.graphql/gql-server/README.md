## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
## Setup

We need [Turso](https://turso.tech/) sqlite database to run this server app.

1. Create a [Turso](https://turso.tech/) DB account (free)
   - Follow the instructions to make a new DB
     - Create a new Group (default is fine) and choose a location
     - Create a new Database
   - Create a Database Token (Either through Turso website or the CLI)
     - Using Turso Website: Click "Create Database Token"
     - Using [the CLI](https://docs.turso.tech/cli/installation): Generate a token for your db with this command `turso db tokens create [your db name]`
2. Create a `.env` file on the root and add these environment variables. If you need the URL, you can use the "Copy URL" button in the Overview tab on Turso:

```bash
TURSO_CONNECTION_URL="your turso db url"
TURSO_AUTH_TOKEN="your db token"
```

3. Push the schema to your Turso DB with this command `npm run db:push`

## Notes

1. Use this application only as server side app
2. GraphQL Apollo server placed in /api/graphql