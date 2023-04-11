const fs = require('fs')
const promises = require('fs').promises
const path = require('path')
//const extract = require('markdown-link-extractor');


const pathValid = (path) => {
   return fs.existsSync(path)
}

//ruta absoluta
const isAbsolute = (direc) => path.isAbsolute(direc);//validar si es absoluta o relativa

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
const findLinks = (text, path) => {
  const regex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g
  const links = []
  let match
  while ((match = regex.exec(text)) !== null) {
    links.push({ 
      texto: match[1],
      url: match[2],
      file: path
    })
  }
  return links;
}

// readingFile('C:/Users/USER/Documents/DEV003-md-links/README.md')
// .then((texto) => {
//  console.log(findLinks(texto, 'C:/Users/USER/Documents/DEV003-md-links/README.md'));
// }).catch(err => console.log(err.message))

const validateLinks = (links) => {
  return new Promise((resolve) => {
    const arrayPromises = []
    //ciclo - iterar array - le paso fetch - solamente a la propiedad href
    //array de objetos - retorne 2 array de objetos - uno cuando funcione y otro cuando no 'roto'
    //luego del fetch usar .then (ok) y .catch (rotos)
    
  })

}





    
module.exports = {
  pathValid,
  isAbsolute,
  turnToAbsolute,
  isFile,
  isFileMd,
  readingFile,
  findLinks,
  validateLinks
}
 