const { ok } = require('assert')
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

//crear arreglo sobre el .md -- CASO: VALIDATE:FALSE
const findLinks = (path) => {
  const data = readingFile(path)
  const regex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g
  const links = []
  let match
  while ((match = regex.exec(data)) !== null) {
    links.push({
      href: match[2], //solo se toma la URL de la expresión regular
      text: match[1],
      file: path
    })
  }
  return links;
}

// const links = findLinks('README.md');
// console.log(links);

const validateLinks = (arr) => {
  return Promise.all(arr.map(link => {
    return fetch(link.href)
      .then(res => ({
        href: link.href,
        text: link.text,
        file: link.file,
        status: res.status,
        ok: res.ok
      }))
      .catch(error => ({
        href: link.href,
        text: link.text,
        file: link.file,
        tatus: error ? error.status : 'Error desconocido',
        statusText: error ? error.statusText : 'Error desconocido'
      }));
  }));
}


// const resultado = findLinks('prueba.md');
// validateLinks(resultado)
// .then((res) => console.log(res))
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
