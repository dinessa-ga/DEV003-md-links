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
const readingFile = (file) => promises.readFile(file, 'utf8') //Antes se utilizaba readFileSync

//C:/Users/USER/Documents/DEV003-md-links/folder_files/prueba.md

// readingFile('C:/Users/USER/Documents/DEV003-md-links/folder_files/prueba.md').then((data) => {
//       console.log(data) 
//   }).catch(err => console.log('El archivo no puede ser leído'));

//crear arreglo sobre el .md -- CASO: VALIDATE:FALSE
const findLinks = (data, path) => {
  const regex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g
  const links = []
  let match 
  while ((match = regex.exec(data)) !== null) {
    links.push({ 
      href: match[0],
      text: match[1],
      file: path
    })
  }
  return links;
}

readingFile('C:/Users/USER/Documents/DEV003-md-links/README.md')
.then((texto) => {
 console.log(findLinks(texto, 'C:/Users/USER/Documents/DEV003-md-links/README.md'));
}).catch(err => console.log(err.message))
 


//ciclo - iterar array - le paso fetch - solamente a la propiedad href
//array de objetos - retorne 2 array de objetos - uno cuando funcione y otro cuando no='roto'
//luego del fetch usar .then (ok) y .catch (rotos)

//crear arreglo que retorne CASO --validate:true 
// const validateLinks = (arrayLinks) => {
//   const results = [];
//   for (let i = 0; i < arrayLinks.length; i++) {
//     const link = arrayLinks[i]
       
//     results.push(fetch(link.href)
//         .then((response) => {
//           const status = {
//             href: link.href,
//             text: link.text,
//             file: link.file,
//             status: response.status,
//             ok: response.statusText
//           };
//         //  return status;
       
//         }) 
//         //capturar errores
//        .catch((error) => {
//         const statusfail = {
//           href: link.href,
//           text: link.text,
//           file: link.file,
//           status: error.status,
//           ok: error.statusText
//         };
//        return statusfail;
//       })
//     )
//   }
//   return Promise.all(results)
// }


// const validateLinks = (response) => {
//   const responseValidated = response.map((item) => {
//       const newItem = fetch(item.href).then((data, path) => {
//           const newValidatedItem = {
//               href: item.href,
//               text: item.text,
//               file: item.file,
//               status: data.status,
//               ok: data.statusText,
//           }
//           return newValidatedItem
//       }).catch((error) => {
//           const newValidatedItem = {
//               href: item.href,
//               text: item.text,
//               file: item.file,
//               status: error.statusText,
//               ok: error.name,
//           }
//           return newValidatedItem;
//       })
//       return newItem
//   })
//   return Promise.all(responseValidated);
// }



const validateLinks = (link, validateCallback) => {
  fetch(link.href, { method: 'HEAD' })
    .then(response => {
      link.status = response.status
      link.ok = response.ok ? 'ok' : 'fail'
      link.validated = true
      validateCallback()
    })
    .catch(error => {
      link.status = null
      link.ok = error
      link.validated = true
      validateCallback()
    })
}

// const resultado = readFile('README.md');
//   validateLinks(findLinks(resultado))
//   .then((res) => console.log(res))
//   .catch((error) => console.log(error))

// const resultado = findLinks('C:/Users/USER/Documents/DEV003-md-links/README.md');
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
 