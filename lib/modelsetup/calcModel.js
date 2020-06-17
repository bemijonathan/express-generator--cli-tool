const process = require('process')
const object = {}

// const types = [
//     "String",
//     "Number",
//     "Date",
//     "Buffer",
//     "Boolean",
//     "Mixed",
//     "ObjectId",
//     "Array",
//     "Decimal128",
//     "Map",
// ]



const format = () => {
    process.argv.forEach((e, i) => {
        if (i > 2) {
            let arrayobject = e.split(':')
            object[`${arrayobject[0]}`] = arrayobject[1]
        }
    })

    console.log(object, "object")

    const schema = {}

    for (const keys in object) {
        schema[keys] = { 
            type:null,
            required: true
        }
    }

    return schema

}

module.exports = format