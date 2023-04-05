const fs = require('fs')
const promises = require('fs').promises
const path = require('path')
//const extract = require('markdown-link-extractor');


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
const isFileMd = (file) => path.extname(file) === '.md'; 
//console.log(isFileMd('C:/Users/USER/Documents/DEV003-md-links/folder_files/prueba.md'))

//Leer archivo .md
const readingFile = (direc) => promises.readFile(direc, 'utf8');
//const linksRead = extract(readingFile)
//console.log(linksRead)
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


// const textMD=`[ ] **Configuración de npm-scripts**

// <details><summary>Links</summary><p>

// * [scripts - Documentación oficial (en inglés)](https://docs.npmjs.com/misc/scripts)
// </p></details>`;

// const links = findLinks(textMD)
//console.log(links)

//console.log(findLinks('https://docs.npmjs.com/misc/scripts'))

module.exports = {
  pathValid,
  isAbsolute,
  turnToAbsolute,
  isFile,
  isFileMd,
  readingFile,
  findLinks
}
 