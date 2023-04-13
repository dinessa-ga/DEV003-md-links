const api = require('./api.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) =>{
    let isPath = path
    
    //identifica si la ruta existe función pathValid
    if (!api.pathValid(isPath)) {
      reject(new Error(`Ruta "${isPath}" no existe`));
    }

    //identifica si la ruta es absoluta función isAbsolute
    if (!api.isAbsolute(path)) {
      isPath = api.turnToAbsolute(path) //ejecuta función que convierte a absoluta
    //Verifica si es archivo
    if (!api.isFile(isPath)){
      reject(new Error(`La ruta "${isPath}" no contiene un archivo`));
    } 
    } 

    //tiene archivo .md? - isFileMd
    if(!api.isFileMd(isPath)){
      reject(new Error(`La ruta "${isPath}" no tiene archivos .md`))
    }

    // si es true devuelve estos 5 si es false 3
    //el usuario va a pedir por medio de comando cli
    // let alllinks = [] 
    // const promisesRead = []
    // promisesRead.push(api.readingFile(isPath))
    // Promise.all(promisesRead)
    // .then((result)=>{
    //   for(let i=0; i<result.length; i++){
        
    //   }
    // })

    const response = api.findLinks(isPath)
    if(options?.validate){
      api.validateLinks(response)
      .then((result) =>{
        //console.log('result if', result)
        resolve(result)
      })
    }
     
      


      resolve('es correcto')
      
    })

    //resolver la función de http

}
//C:/Users/USER/Documents/DEV003-md-links/folder_files/archivo.txt
//C:/Users/USER/Documents/DEV003-md-links/readme.md

// mdLinks('README.text')
// .then((result) => {
//   console.log(result)
// })
// .catch((error) => {
//   console.log(error)
// })

module.exports = () => {
   mdLinks
};
