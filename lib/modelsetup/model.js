#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const process = require('process')
const childprocess = require('child_process')
const path = require('path');
const Schema = require('./calcModel')

console.log(Schema)

const createModel = () => {
    const output = `
    require('mongoose')
    var Schema = mongoose.Schema;

    var ${process.argv[2]}Schema = new Schema(
        ${ JSON.stringify(Schema())} 
    );

    const ${process.argv[2]} = mongoose.model(${process.argv[2]}, ${process.argv[2]}Schema);

    module.export = ${process.argv[2]}

`
    fs.writeFile('model/' + process.argv[2] + '.js', output, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    let fd = fs.readFile(`model/${process.argv[2]}.js`, { encoding: 'utf8' }, (err, data) => {
        console.log(data)
    })

    fs.appendFile(`model/index.js`, `\n const ${process.argv[2]} = require('./${process.argv[2]}')`, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    })
    // console.log(fd)
    // fs.appendFile('model/index.js', output, err => {
    //     if (err)
    // })
}


if (fs.existsSync(`model/${process.argv[2]}.js`)) {
    console.log(chalk.redBright.bold(`
        ERROR:
        This file already exists.
        check properly or add the --force flag to overwrite
    `));
} else {
    createModel()
}




