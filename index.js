const api = require('./api.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    let isPath = path

    //identifica si la ruta existe función pathValid
    if (!api.pathValid(isPath)) {
      reject(new Error(`Ruta "${isPath}" no existe`));
    }

    //identifica si la ruta es absoluta función isAbsolute
    if (!api.isAbsolute(path)) {
      isPath = api.turnToAbsolute(path) //ejecuta función que convierte a absoluta
      //Verifica si es archivo
      if (!api.isFile(isPath)) {
        reject(new Error(`La ruta "${isPath}" no contiene un archivo`));
      }
    }

    //tiene archivo .md? - isFileMd
    if (!api.isFileMd(isPath)) {
      reject(new Error(`La ruta "${isPath}" no tiene archivos .md`))
    }

    const response = api.findLinks(isPath)
    if (options?.validate) {

      api.validateLinks(response)
        .then((result) => {
          resolve(result)
        })
        .catch(error => {
          resolve(error)
        })

    }else{
      resolve(response)
    }

   
    resolve('es correcto')

  })

}
//C:/Users/USER/Documents/DEV003-md-links/folder_files/archivo.txt
//C:/Users/USER/Documents/DEV003-md-links/readme.md

//mdLinks('prueba.md', { validate: true }).then((data) => console.log('data: ', data))
//mdLinks('prueba.md', { validate: false }).then((data) => console.log('data: ', data))

mdLinks('prueba.md')
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })

module.exports = () => {
  mdLinks
};
