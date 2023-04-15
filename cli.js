#!/usr/bin/env node
const { mdLinks } = require('./index.js')

// Expone ejecutable md-links en el path (configurado en package.json)
// Se ejecuta sin errores / output esperado
// Implementa --validate
// Implementa --stats


// mdLinks().then((data)=>{
//     if(stats){

//     }
// })
// .catch ((error) => {console.log(error)})

const cli = (path, options) => {

    const path = process.argv[2];
    const validate = process.argv.includes("--validate")
    const stats = process.argv.includes("--stats")
    const options = { validate: validate }

    if(path === undefined || path == help){
        console.log('Welcome to mdLinks')
        console.log('Insert your path and write the next options')
        console.log('--validate --> when you require to validate the status of the links')
        console.log('--stats --> when you require to see stadistics and status of the links')
        console.log('--validate --stats --> to see both options')
        process.exit(0)
    }
    

}