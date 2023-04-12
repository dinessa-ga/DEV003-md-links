const fs = require('fs')
const promises = require('fs').promises
const path = require('path')
//const extract = require('markdown-link-extractor');


const pathValid = (path) => {
   return fs.existsSync(path)
}

//ruta absoluta
const isAbsolute = (filePath) => path.isAbsolute(filePath);//pregunta si es absoluta o relativa

//Convertir la ruta a absoluta
const turnToAbsolute = (absolute) => path.resolve(absolute)

//detectar archivo
const isFile = (path) => {
  const stats = fs.statSync(path);
  return stats.isFile()
}

//detectar .md 
const isFileMd = (file) => path.extname(file) === '.md'; 


//Leer archivo .md
const readingFile = (file) => promises.readFile(file, 'utf8'); //Antes se utilizaba readFileSync

//C:/Users/USER/Documents/DEV003-md-links/folder_files/prueba.md

// readingFile('C:/Users/USER/Documents/DEV003-md-links/readme.md').then((data) => {
//       console.log(data) 
//   }).catch(err => console.log('El archivo no puede ser leído'));





//crear arreglo sobre el .md - href text - CASO: VALIDATE:FALSE
const findLinks = (data, path) => {
  const regex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g
  const links = []
  let match
  while ((match = regex.exec(data)) !== null) {
    links.push({ 
      href: match[2],
      text: match[1],
      file: path
    })
  }
  return links;
}

// readingFile('C:/Users/USER/Documents/DEV003-md-links/README.md')
// .then((texto) => {
//  console.log(findLinks(texto, 'C:/Users/USER/Documents/DEV003-md-links/README.md'));
// }).catch(err => console.log(err.message))


//ciclo - iterar array - le paso fetch - solamente a la propiedad href
    //array de objetos - retorne 2 array de objetos - uno cuando funcione y otro cuando no 'roto'
    //luego del fetch usar .then (ok) y .catch (rotos)

// const validateLinks = (array) => {
//   return new Promise((resolve) => {
//     let arrayPromises = []
//     for (let i=0; i<=array.length; i++){
//       fetch(array[i].href)
      
//       .then((respuesta) => {
//         arrayPromises.push({
//           text: array[i].text,
//           href: array[i].href,
//           file: array[i].file,
//           status: respuesta.status,
//           message: 'Ok'
//         })
//       resolve(arrayPromises)
      
//       })
//       .catch((error) => {
//         console.log('esto es un' + error)
//       })
//     }
    
//   })
// }

const validateLinks = (arrayLinks) => {
  const results = arrayLinks.map((link) => {
    return fetch(link.href)
      .then((response) => {
        const status = {
          href: link.href,
          text: link.text,
          file: link.file,
          status: response.status,
          ok: 'ok'
        };
        return status;
      })
      .catch((error) => {
        const statusError = {
          href: link.href,
          text: link.text,
          file: link.file,
          status: error.status || 'Unknown',
          ok: 'fail'
        };
        return statusError;
      });
  });
  return Promise.all(results);
};

const resultado = findLinks('C:/Users/USER/Documents/DEV003-md-links/README.md');
validateLinks(resultado)
 .then((res) => console.log(res))
.catch((error) => console.log(error))

// findLinks('C:/Users/USER/Documents/DEV003-md-links/README.md')
//   .then((datosdatos) => {
//       console.log(" es", datosdatos)
//       validateLinks(datosdatos).then((resultados) => {console.log("status", resultados)})
//   })

// const read = readingFile('C:/Users/USER/Documents/DEV003-md-links/README.md')
// const resultado = findLinks(read);
// validateLinks(resultado)
//  .then((res) => console.log(res))
//  .catch((error) => console.log(error))

// findLinks('C:/Users/USER/Documents/DEV003-md-links/README.md')
// .then((texto) => {
//  console.log(validateLinks(texto, 'C:/Users/USER/Documents/DEV003-md-links/README.md'));
// }).catch(err => console.log(err.message))




    
module.exports = {
  pathValid,
  isAbsolute,
  turnToAbsolute,
  isFile,
  isFileMd,
  readingFile,
  findLinks,
  validateLinks,
}
 