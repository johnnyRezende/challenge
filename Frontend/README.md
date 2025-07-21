# Movies List Interface

A **Single Page Application (SPA)** built with [**Next.js**](https://nextjs.org/) to display movie information from a public API. This app was designed with a focus on responsiveness, performance, and clean code organization.

---

## Technologies Used

### Core Stack

- [**Next.js**](https://nextjs.org/)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**JavaScript**](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Dependencies

- [**Axios**](https://axios-http.com/) – HTTP Requests

### Dev Dependencies

- [**Jest**](https://jestjs.io/) – JavaScript testing framework
- [**babel-jest**](https://www.npmjs.com/package/babel-jest) – Babel integration for Jest
- [**TypeScript**](https://www.typescriptlang.org/) – Also used as a dev dependency

---

## About the Project

This project showcases my technical skills in developing **SPA applications using React/Next.js** with custom-built UI components — no use of UI frameworks like Material UI or Bootstrap.

**Data is fetched from a public API:**

[**https://challenge.outsera.tech/api/movies**](https://challenge.outsera.tech/api/movies)\
API Documentation: [Swagger UI](https://challenge.outsera.tech/swagger-ui/index.html)

**All the components are unit tested**

---

## Pages Structure

### ashboard Page

- Table with years that had **more than one winner**
- Table with the **three studios with the most wins**
- Tables with **producers with the longest and shortest intervals** between wins
- Table with winners for a **specific year** (selectable via search field)

### List Page

- Paginated table with **all movies**
- Filters:
  - By **year**
  - By **winner status**

Minimum responsive resolution: **768x1280**

---

## Installation

> Prerequisite: Node.js **v20 or higher**

Clone the repository and install the dependencies:

```bash
git clone https://github.com/johnnyRezende/challenge.git

cd challenge/Frontend

npm install
```

---

## Running Locally

Start the development server:

```bash
npm run dev
```

Then open your browser at: [http://localhost:3000](http://localhost:3000)

---

## Unit Tests

Run all tests using:

```bash
npm test
```
## Improvement opportunities

- Implement loading component for when fetching data
- Replace UseEffect hooks by [TanStack Query](https://tanstack.com/query/latest) package in case of implementing more requests in the future.
  - Built-in Loading, Error, and Success States
  - Automatic Caching
  - Pagination and Infinite Queries
  - Better Separation of Concerns
