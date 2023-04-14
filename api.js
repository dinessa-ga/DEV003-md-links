const fs = require('fs')
const { Response } = require('node-fetch')
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
//const readingFile = (file) => promises.readFile(file, 'utf8') //Antes se utilizaba readFileSync
const readingFile = (file) => fs.readFileSync(file, 'utf8');


// readingFile('C:/Users/USER/Documents/DEV003-md-links/folder_files/prueba.md').then((data) => {
//       console.log(data) 
//   }).catch(err => console.log('El archivo no puede ser leído'));

//crear arreglo sobre el .md -- CASO: VALIDATE:FALSE
const findLinks = (data, path) => {
  const regex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g
  const links = []
  const fileContent = readingFile(path)
  let match
  while ((match = regex.exec(fileContent)) !== null) {
    links.push({ 
      href: match[0],
      text: match[1],
      file: path
    })
  }
  return links;
}

const links = findLinks('arreglo','README.md');
console.log(links);

// readingFile('C:/Users/USER/Documents/DEV003-md-links/README.md')
// .then((texto) => {
//  console.log(findLinks(texto, 'C:/Users/USER/Documents/DEV003-md-links/README.md'));
// }).catch(err => console.log(err.message))
 


//ciclo - iterar array - le paso fetch - solamente a la propiedad href
//array de objetos - retorne 2 array de objetos - uno cuando funcione y otro cuando no='roto'
//luego del fetch usar .then (ok) y .catch (rotos)

const validateLinks = (array) => {
  let arrayObject = array.map((link) => {
      return fetch(link.href)
          .then(data => {
              return {
                  href: link.href,
                  text: link.text,
                  file: link.file,
                  status: data.status,
                  state: data.statusText,
              }
          })
          .catch(error => {
            //console.log(error)
              return {
                  href: link.href,
                  text: link.text,
                  file: link.file,
                  status: error.status,
                  state: error.error,
              }
          });
  })
  return Promise.all(arrayObject);
} 

// const resultado = findLinks('esto','README.md');
// validateLinks(resultado)
// .then((res) => console.log('llamando', res))
// .catch((error) => console.log(error))

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
 