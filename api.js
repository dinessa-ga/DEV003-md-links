const fs = require('fs')
const path = require('path')



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
//const readingFile = (file) => promises.readFile(file, 'utf8') 
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

//crear arreglo con peticiones http sobre el .md -- CASO: VALIDATE:TRUE
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
        tatus: error.status,
        statusText: error.statusText
      }))
  }))
}

//Función para devolver estadísticas básicas sobre los links - total:
const totalLinks = (path) => `Total: ${findLinks(path).length}`;


// const resultado = findLinks('prueba.md');
// validateLinks(resultado)
// .then((res) => console.log(res))
// .catch((error) => console.log(error))


// const path1 = 'C:/Users/USER/OneDrive/Documentos/DEV003-md-links/prueba.md'
// console.log('Links encontrados:');
// console.log(findLinks(path1));

// console.log('Total de links:');
// console.log(totalLinks(path1));

module.exports = {
  pathValid,
  isAbsolute,
  turnToAbsolute,
  isFile,
  isFileMd,
  readingFile,
  findLinks,
  validateLinks,
  totalLinks,
}
