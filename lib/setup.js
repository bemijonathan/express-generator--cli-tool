#!/usr/bin/env node

const process = require('process')
const chalk = require('chalk')
const childprocess = require('child_process')
const fs = require('fs')

console.log(process.argv)

console.log(chalk.bold.yellow("setting up files and folders....."))

try {
    childprocess.execSync('mkdir model && mkdir middleware && mkdir controller && mkdir routes && touch index.js')
} catch (error) {
    console.log(chalk.bold.redBright(  `set up has already been activated use --force to overwrite current settings`))
}

try {
    childprocess.execSync('touch model/index.js && touch controller/index.js && touch middleware/index.js')
} catch (error) {
    console.log(error)
}

const content = `


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("");

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;

`

fs.writeFile('./app.js', content, (err, result) => {
    if(err) console.log(chalk.bold.redBright('unable to create app.js'))
    else {
        console.log('project set up complete')
    }
})


