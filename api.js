const fs =require('fs')

const path = require('path')

//const isPath = 'C:\Users\USER\Documents\DEV003-md-links\README.md';

// const pathValid = (path) => {
//     return fs.existsSync(path)
//   }

  const pathValid1 = (path) => fs.existsSync(path)
   console.log(pathValid1('./README.md'))
  
//  console.log(path) 
//  console.log(fs) 

const fullPath = path.join(__dirname, "./README.md")
//console.log(fullPath)

//ruta absoluta
 const isAbsolute = (path) => {
    return path.isAbsolute(path)
  }
  
  
//detectar .md"
  const  isFileMd =  (pathResolved) => {
    const searchMarkdown = path.parse(pathResolved).ext === '.md'
    return path.isFileMd(path)
  }
 // console.log(path)

 