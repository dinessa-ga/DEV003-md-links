const { promises } = require('fs');
const {isFileMd, readingFile} = require('./api.js');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

  
// });

test('api.js', () => {

  it('comprueba si un archivo es .md', () => {
    expect(isFileMd('prueba.md')).toBe(true);
    expect(isFileMd('archivo.txt')).toBe(false);
  });

  
});




