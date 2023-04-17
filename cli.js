#!/usr/bin/env node

const  mdLinks  = require('./index')
const { totalLinks } = require('./api.js')
const process = require('process');
const argv = process.argv;
const path = process.argv[2];

// // Expone ejecutable md-links en el path (configurado en package.json)
// // Se ejecuta sin errores / output esperado
// // Implementa --validate
// // Implementa --stats


const cli = () => {
    const validate = argv.includes("--validate") || argv.includes("-v");
    const stats = argv.includes("--stats") || argv.includes("-s");

    if (path === undefined || path == '--help') {
        console.log('Welcome to mdLinks')
        console.log('Insert your path and write the next options')
        console.log('--validate --> when you require to validate the status of the links')
        console.log('--stats --> when you require to see stadistics and status of the links')
        console.log("--validate --stats: To see statistics and status of the links ");
        process.exit(0)
 
    }

    else if (stats) {
        return mdLinks(path, { stats: stats}).then((links) => {
            console.log("\nTOTAL LINKS  :" + (totalLinks(links)));
            console.log("---------------------------------------------------------");
            process.exit(0);
        }).catch((error) => { console.log(error); 
        })
        
    } 

}


cli()