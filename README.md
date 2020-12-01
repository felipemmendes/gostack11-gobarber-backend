# GoBarber Server

This is the code for the GoBarber API. [Click here](https://github.com/felipemmendes/gostack11-gobarber-frontend) to check out the code for the website, and [here](https://github.com/felipemmendes/gostack11-gobarber-mobile) to check out the code for the mobile app.

This project was made during Rocketseat's [GoStack Bootcamp](https://pages.rocketseat.com.br/gostack).

## What is GoBarber?

GoBarber is a barbershop app that allows barbers and customers to schedule and manage appointments.

## Features

- Create, read and update users
- Create user sessions (JWT authentication)
- Password recovery
- Create, read and query scheduled appointments

## Getting Started

To run the server you will need npm or yarn installed in your computer. Also, you need to start a Postgres, a MongoDB and a Redis database.

1. Clone the repository
   ```sh
   git clone https://github.com/felipemmendes/gostack11-gobarber-backend.git
   ```
2. Install NPM packages

   ```sh
   npm install
   ```

   or

   ```sh
   yarn
   ```

3. Rename `.env.example` to `.env` and `ormconfig.example.json` to `ormconfig.json`. Edit these files with your own configuration (database configuration and other sensitive information)

4. Run the migrations in the database

   ```sh
   npm run typeorm migration:run
   ```

   or

   ```sh
   yarn typeorm migration:run
   ```

5. Start the server in development mode

   ```sh
   npm run dev:server
   ```

   or

   ```sh
   yarn dev:server
   ```

6. `npm run build` or `yarn build` will create a `dist` folder, which contains the compiled version (the .js version) of the code.

### Aditional notes

To manually test the routes, you can use [Insomnia](https://insomnia.rest/). Import the [workspace file](insominia-workspace.json) and have fun!

Also, you can run the tests I've written with `npm run test` or `yarn test`.
