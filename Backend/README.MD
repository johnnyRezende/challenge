# Producers winners Backend API

A RESTful API built with **Node.js** and **Express**, serving producers winners of the oscar.

---

## Core Technologies

- **[Node.js](https://nodejs.org/)**
- **[Express](https://expressjs.com/)**
- **[Sequelize](https://sequelize.org/)**
- **[SQLite3](https://www.sqlite.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**

**Dev dependencies:**
- **[csv-parse](https://www-npmjs-com.translate.goog/package/csv-parse?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc)** - Enrich database with csv data
- **[Jest](https://jestjs.io/)** - Integration testes
- **[supertest](https://www.npmjs.com/package/supertest)** - Integration tests

---

## About the Project

This project showcases my technical skills in developing **NodeJS Backend Applications** with embedded database and E2E Tested.

**Data is enriched from [movies.csv](https://github.com/johnnyRezende/challenge/blob/main/Backend/src/database/movies.csv) file to SQLite3 embedded database**

**Database Schemma is implemented in [Models](https://github.com/johnnyRezende/challenge/tree/main/Backend/src/models)**

## Installation

**Prerequisite**: Node.js **v20+**

Clone the repo, install dependencies, and set up environment variables:

```bash
git clone https://github.com/johnnyRezende/challenge.git

cd challenge/Backend

npm install
```

## Running the API
Start the server locally:

```bash
npm run dev
# or for production builds:
npm run build
npm start
```

By default, it will be accessible at:
http://localhost:3000/producers/award-interval

## API Endpoints

- **GET** producers/award-interval
  - Lists all movies

  **Response format:**
  ```json
    {
    "max": [
      {
        "producer": "Johnny Rezende",
        "interval": 8,
        "previousWin": 1996,
        "followingWin": 2004
      }
    ],
    "min": [
      {
        "producer": "Johnny Rezende",
        "interval": 1,
        "previousWin": 1995,
        "followingWin": 1996
      },
      {
        "producer": "Kevin Costner",
        "interval": 1,
        "previousWin": 1994,
        "followingWin": 1995
      }
    ]
  }
  ```


## Integration Tests

Run the following command:

```bash
npm test
```

## Improvement opportunities

- Implement [ZOD](https://zod.dev/) package to validate parameters for future endpoints
- Implement Middlewares for validating API Errors
- Protect API with JWT authentication
- Replace embedded database with self hosted or fully managed databases
- Implement future useful tools as dependencie injection with [awilix](https://github.com/jeffijoe/awilix)
