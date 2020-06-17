#!/usr/bin/env node

const process = require('process')
const chalk = require("chalk")
const fs = require('fs')
const data = process.argv[2]


const CreateController = () => {

    var textdata = fs.readFileSync('app.js').toString().split("\n");
    textdata.splice(0, 0, [`const productRoutes = require('/routes/${data}Routes')`]);
    textdata.splice(32, 0, `app.use("/${data}, ${data}Routes")`)
    var text = textdata.join("\n");

    fs.writeFile('app.js', text, (err) => {
        if (err) console.log(err);
    });

    // Routes which should handle requests
    // const productRoutes = require('/routes/productRoutes')
    // app.use("/products", productRoutes);


    // 2. generates the controller 
    let controllercontent = `
var Model = require('../models'). addModelNameHere;

/**
 * ${data}Controller.js
 *
 * @description :: Server-side logic for managing ${data}.
 */

module.exports = {
    get: function (req, res) {
        Model.find(function (err, ${data}s) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ${data}.',
                    error: err
                });
            }
            return res.json(${data}s);
        });
    },

    /**
     * ${data}Controller.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        Model.findOne({_id: id}, function (err, ${data}) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ${data}.',
                    error: err
                });
            }
            if (!${data}) {
                return res.status(404).json({
                    message: 'No such ${data}'
                });
            }
            return res.json(${data});
        });
    },

    /**
     * ${data}Controller.create()
     */
    create: function (req, res) {
        var ${data} = new Model({
        });

        ${data}.save(function (err, ${data}) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating ${data}',
                    error: err
                });
            }
            return res.status(201).json(${data});
        });
    },

    /**
     * ${data}Controller.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        Model.findOne({_id: id}, function (err, ${data}) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ${data}',
                    error: err
                });
            }
            if (!${data}) {
                return res.status(404).json({
                    message: 'No such ${data}'
                });
            }


            ${data}.save(function (err, ${data}) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating ${data}.',
                        error: err
                    });
                }

                return res.json(${data});
            });
        });
    },

    /**
     * ${data}Controller.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        Model.findByIdAndRemove(id, function (err, ${data}) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the ${data}.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
};`


    fs.writeFile(`controller/${data}Controller.js`, controllercontent, err => {
        if (err) console.log(err)
    })

    // 3. generates the route



    const routecontent = `
var express = require('express');
var router = express.Router();
var ${data}Controller = require('../controller/${data}Controller.js');

/*
 * GET
 */
router.get('/', ${data}Controller.get);

/*
 * GET/:id
 */
router.get('/:id', ${data}Controller.show);

/*
 * POST
 */
router.post('/', ${data}Controller.create);

/*
 * PUT
 */
router.put('/:id', ${data}Controller.update);

/*
 * DELETE
 */
router.delete('/:id', ${data}Controller.remove);

module.exports = router;  `


    fs.writeFileSync(`routes/${data}Routes.js`, routecontent, err => {
        if (err) console.log(err)
    })


    console.log(chalk.bold.greenBright(`
    created : routes/${data}Routes.js
    created : controller/${data}Controller.js
    write : app.js
`))
}


if(fs.existsSync(`controller/${data}Controller.js`)) {
    console.log(chalk.redBright.bold(`
        ERROR:
        This file already exists.
        check properly or add the --force flag to overwrite
    `));
} else {
    CreateController()
}
