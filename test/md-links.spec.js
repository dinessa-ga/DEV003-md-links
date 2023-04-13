//const mdLinks = require('../');
const {isFileMd, readingFile, findLinks } = require('../api.js');
const fs = require('fs');




// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

  
// });

describe('isFileMd', () => {
  it('devuelve true para archivos con extensión .md', () => {
    expect(isFileMd('prueba.md')).toBe(true);
  });

  it('devuelve false para archivos con extensión diferente a .md', () => {
    expect(isFileMd('archivo.txt')).toBe(false);
  });
});


// Función readingFile
test('readingFile debería leer el contenido del archivo', () => {
  // Crea un archivo temporal con un contenido específico
  fs.writeFileSync('readme1.md', 'Hello, world!', 'utf8');

  // Llama a la función readingFile para leer el contenido del archivo
  return readingFile('readme1.md').then((content) => {
    // Verifica que el contenido leído es el esperado
    expect(content).toEqual('Hello, world!');

    // Elimina el archivo temporal después de la prueba
    fs.unlinkSync('readme1.md');
  });
});


// Función FindLinks
test('findLinks should find all links in the text', () => {
  // Define el texto de entrada y el path
  const text = 'Este es un texto con un [enlace](https://www.google.com)';
  const path = '/test/file.md';

  // Llama a la función findLinks para buscar los enlaces
  const links = findLinks(text, path);

  // Verifica que la función haya encontrado el enlace correcto
  expect(links).toEqual([
    {
      href: 'https://www.google.com',
      texto: 'enlace',
      file: '/test/file.md'
    }
  ]);
});