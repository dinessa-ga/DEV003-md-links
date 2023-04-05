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
const readingFile = (file) => promises.readFile(file, 'utf8');


// readingFile('C:/Users/USER/Documents/DEV003-md-links/readme.mz').then((data) => {
//       console.log(data) //posteriormente esto será mi resolve
//   }).catch(err => console.log({code: 'ENOENT' }, 'El archivo no puede ser leído'));

//console.log(readingFile('C:/Users/USER/Documents/DEV003-md-links/readme.md'))


//crear arreglo sobre el .md - href text 
function findLinks(texto, path) {
  const regex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
  const links = [];
  let match;
  while ((match = regex.exec(texto)) !== null) {
    //console.log(match)
    links.push({ 
      texto: match[1],
      url: match[2],
      file: path
    });
  }

  return links;
  
}
 readingFile('folder_files\\prueba.md').then((texto) => {
       console.log(findLinks('folder_files\\prueba.md', texto));
    }).catch(err => console.log(err.message))


module.exports = {
  pathValid,
  isAbsolute,
  turnToAbsolute,
  isFile,
  isFileMd,
  readingFile,
  findLinks
}
 