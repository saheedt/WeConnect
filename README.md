[![Build Status](https://travis-ci.org/saheedt/WeConnect.svg?branch=develop)](https://travis-ci.org/saheedt/WeConnect)
[![Maintainability](https://api.codeclimate.com/v1/badges/96e045c38f268c4a8c76/maintainability)](https://codeclimate.com/github/saheedt/WeConnect/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/96e045c38f268c4a8c76/test_coverage)](https://codeclimate.com/github/saheedt/WeConnect/test_coverage)

# WeConnect
WeConnect provides a platform that brings businesses and individuals (customers) together.

---

## Table of contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Tests](#tests)
- [Built With](#built-with)
- [Authors](#authors)
- [License](#license)

---

## Introduction
The application **_currently_** has the following features working:
- sign up
- login
- reset password
- register business
- update business
- retrieve a business
- retrieve all businesses
- retrieve business by location
- retrieve business by category
- delete business
- review a business
- retrieve all reviews for a business

This project is divided into three parts:

1. The Templates:
    
    * This part holds the UI / template for the project.

2. The Server:

    * This part holds the server-side functionalities.

3. The Client:

    * This part hold the front-end functionalities which users get to intereact with.

## Getting Started

* The template folder holds the project UI templates, hosted on github pages.
  - To view the UI template for the WeConnect web application, please click this link [WeConnect UI](https://saheedt.github.io/WeConnect/template/landing.html)

* The server folder holds the backend API, hosted on heroku.
  - To view the API docs with dummy data, please click this link [WeConnect API docs (dummy data)](https://weconnect-saheed.herokuapp.com)
  - To view the API docs with database data, please click this link [WeConnect API docs (database data)](https://weconnect-saheed-updated.herokuapp.com)

### Prerequisites
To view the UI Template and API docs, please use a web browser, preferably, Google Chrome.

### Installation

* Navigate to a directory on your machine using your favourite terminal / command line application
* Clone this repository into that directory
  - Using SSH: ```git clone git@github.com:saheedt/WeConnect.git```
  - Using HTTP: ```git clone https://github.com/saheedt/WeConnect.git```
* Navigate to the repository's directory
    - `cd WeConnect`
* Install the app's dependencies
    - `npm install`
* Run application
    - `npm run postinstall`
    - `npm start`

## Tests

* The tests were written using SuperTest and chai
* The test coverage is generated by istanbul
* To run tests, navigate to the project's root directory
* After installation, run the following command
    - `npm run test`

## Built With

* HTML/CSS
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Materialize Css](http://materializecss.com/)
* [Express Js](https://expressjs.com/)
* [Node js](https://nodejs.org/en/)

## Authors

* Saheed Ajibulu

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/saheedt/WeConnect/blob/master/LICENSE)