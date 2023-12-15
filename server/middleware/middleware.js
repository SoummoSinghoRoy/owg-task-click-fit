const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const middlewares = [
  morgan('dev'),
  express.urlencoded({extended: true}),
  express.json(),
  cors(),
  cookieParser()
]

module.exports = executeAbleMiddleware = (app) => {
  middlewares.forEach((middleware) => {
    app.use(middleware)
  })
}