const api = require('./api');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) =>{
   // const absolutePath =  pathValid(path) 
   //identifica si la ruta existe función pathValid
   
  //  if (!api.pathValid(path)) {
  //   throw new Error(`File "${path}" no existe`);
  // }

  //identifica si la ruta es absoluta función isAbsolute
  if (!api.isAbsolute(path)) {
  let pathAbsolute = api.turnToAbsolute(path)
    if (!api.isFile){
      throw new Error(`File "${pathAbsolute}" no es un archivo`);
    } 
  } 

  

  // 
  // if (!api.isMarkdownFile(path)) {
  //   throw new Error(`"${path}" is not a Markdown file`);
  // }

    
      
    

    //

    resolve('es correcto')
    // si es true devuelve estos 5 si es false 3
    //el usuario va a pedir por medio comando cli
  })

  //resolver la función de http

}
mdLinks('C:/Users/USER/Documents/DEV003-md-links/readme.md')
.then((result) => {
  console.log(result)
})
.catch((error) => {
  console.log(error)
})

module.exports = () => {
  // ...
};
