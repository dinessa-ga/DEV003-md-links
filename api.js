const fs = require('fs')

const path = require('path')


const pathValid = (path) => {
   return fs.existsSync(path)
}

//console.log(pathValid('C:/Users/USER/Documents/DEV003-md-links'));

//const pathValid1 = (path) => fs.existsSync(path)



//ruta absoluta
const isAbsolute = (direc) => path.isAbsolute(direc);//validar si es absoluta o relativa

console.log(isAbsolute('C:/Users/USER/Documents/DEV003-md-links/readme.md'))

console.log(isAbsolute('./README.md'))

//Convertir la ruta a absoluta
const turnAbsolut = (absolute) => path.resolve(absolute)

console.log(turnAbsolut('./README.md'))
  
//detectar archivo


  
//detectar .md"
  const  isFileMd =  (pathResolved) => {
    const searchMarkdown = path.parse(pathResolved).ext === '.md'
    return path.isFileMd(path)
  }
 // console.log(path)

 