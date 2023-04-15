//const mdLinks = require('../')
const {isFileMd} = require('../api.js')
const fs = require('fs');
const mdLinks = require('../index.js')
const fetch = require('node-fetch')

jest.mock('node-fetch')



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


