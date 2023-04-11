const api = require('./api.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) =>{
  let isPath = path
  
  //identifica si la ruta existe función pathValid
  if (!api.pathValid(isPath)) {
    reject(new Error(`Ruta "${isPath}" no existe`));
  }

  //identifica si la ruta es absoluta función isAbsolute
  if (!api.isAbsolute(isPath)) {
     let absolutePath = api.turnToAbsolute(isPath) //ejecuta función que convierte a absoluta
   //Verifica si es archivo
   if (!api.isFile(absolutePath)){
    reject(new Error(`La ruta "${absolutePath}" no contiene un archivo`));
  } 
  } 

 

  // //tiene archivo .md? - isFileMd
  //  if(!api.isFileMd(isPath)){
  //   reject(new Error(`La ruta "${isPath}" no tiene archivos .md`))
  // }

    
      
    


    resolve('es correcto')
    // si es true devuelve estos 5 si es false 3
    //el usuario va a pedir por medio comando cli
  })

  //resolver la función de http

}
//C:/Users/USER/Documents/DEV003-md-links/folder_files/archivo.txt
//C:/Users/USER/Documents/DEV003-md-links/readme.md

mdLinks('README.md')
.then((result) => {
  console.log(result)
})
.catch((error) => {
  console.log(error)
})

module.exports = () => {
  // ...
};
