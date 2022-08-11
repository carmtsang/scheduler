# Interview Scheduler

Interview Scheduler is a project created by [Carmen](https://github.com/carmtsang) for Lighthouse Labs bootcamp. It is a single-page application that allows users to book and cancel interviews. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

Interview scheduler uses `node v12.22.7`

## Finished Product

![New Interview](https://github.com/carmtsang/scheduler/blob/master/docs/New%20Interview.png)
Adding a new Interview

![New Interview Added](https://github.com/carmtsang/scheduler/blob/master/docs/Added.png)
New interview added

![Delete](https://github.com/carmtsang/scheduler/blob/master/docs/Delete.png)
Warning prior to deleting an interview

![Storybook1](https://github.com/carmtsang/scheduler/blob/master/docs/Storybook%20Testing%201.png)
Component testing for Interview List

![Cypress1](https://github.com/carmtsang/scheduler/blob/master/docs/Cypress%20Testing%202.png)
Testing with Cypress

## Setup

Install dependencies with `npm install`.

Fork and setup the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api).

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress

```sh
npm run cypress
```

### Dependencies

- axios
- react
- react-dom
- normalize.css
- react scripts
- classnames

### Dev-dependencies

- storybook
- testing-library/jest-dom
- testing-library/react
- testing-library/react-hooks
- prop-types
- react-test-renderer
- sass
- cypress 9.7.0
