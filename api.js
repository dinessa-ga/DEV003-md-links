const fs = require('fs')

const path = require('path')


const pathValid = (path) => {
   return fs.existsSync(path)
}

//console.log(pathValid('C:/Users/USER/Documents/DEV003-md-links'));
//const pathValid1 = (path) => fs.existsSync(path)

//ruta absoluta
const isAbsolute = (direc) => path.isAbsolute(direc);//validar si es absoluta o relativa

//console.log(isAbsolute('C:/Users/USER/Documents/DEV003-md-links/readme.md'))
//console.log(isAbsolute('./README.md'))

//Convertir la ruta a absoluta
const turnToAbsolute = (absolute) => path.resolve(absolute)

//console.log(turnToAbsolute('./README.md')) 
  
//detectar archivo
const isFile = (path) => {
  const stats = fs.statSync(path);
  return stats.isFile()
}
//console.log(isFile('C:/Users/USER/Documents/DEV003-md-links/readme.md'))  
//detectar .md 
const isFileMd = (file) => path.extname(file) === '.md'; //validar extensión de archivo
console.log(isFileMd('C:/Users/USER/Documents/DEV003-md-links/folder_files/prueba.md'))

//Leer archivo .md
const readingFile = (direc) => fs.readFileSync(direc, 'utf8');

//console.log(readingFile('C:/Users/USER/Documents/DEV003-md-links/readme.md'))

//crear arreglo href text file
function findLinks(texto) {
  const regex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
  const enlaces = [];
  let match;

  while ((match = regex.exec(texto)) !== null) {
    enlaces.push({ 
      texto: match[1],
      url: match[2]
    });
  }

  return enlaces;
}

//console.log(readFiles('esto es','C:/Users/USER/Documents/DEV003-md-links/readme.md'))
//console.log(findLinks('esto es','C:/Users/USER/Documents/DEV003-md-links/folder_files/prueba.md'))
//console.log(readFiles('C:/Users/USER/Documents/DEV003-md-links/readme.md'))
module.exports = {
  pathValid,
  isAbsolute,
  turnToAbsolute,
  isFile,
  isFileMd,
  readingFile
}
 