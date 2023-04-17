//const mdLinks = require('../')
const {isFileMd} = require('../api.js')
const {mdLinks} = require('../index.js')


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });
// });
const path = 'prueba.md'
const options = null

const arrayLinks = 
[
  {
    href: 'https://docs.npmjs.com/misc/scripts',
    text: 'scripts - Documentación oficial (en inglés)',
    file: 'C:\\Users\\USER\\OneDrive\\Documentos\\DEV003-md-links\\prueba.md'
  },
  {
    href: 'https://nodejs.org/es/about/',
    text: 'Acerca de Node.js - Documentación oficial',
    file: 'C:\\Users\\USER\\OneDrive\\Documentos\\DEV003-md-links\\prueba.md'
  },
]


// test('should reject a promise with an error message when the path does not exist', () => {
//   return expect(mdLinks(path, options)).rejects.toMatch('error');
// });

// test('should reject the promise with the expected error', async () => {
//   const expectedError = new Error('Something went wrong');
//   await expect(mdLinks(path, options)).rejects.toEqual(expectedError);
// });


describe('isFileMd', () => {
  it('devuelve true para archivos con extensión .md', () => {
    expect(isFileMd('prueba.md')).toBe(true);
  });

  it('devuelve false para archivos con extensión diferente a .md', () => {
    expect(isFileMd('archivo.txt')).toBe(false);
  });
});


describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  })

  // it('should return a promise', () => {
  //   return mdLinks()
  //     .then(() => {
  //      expect(mdLinks()).toBe(typeof 'promise')
  //     })
  //     .catch((err) => { err });
  // })

  it('should return a promise', () => {
    expect(mdLinks(path, options)).toBeInstanceOf(Promise);
  });
 
  it('should return the links with the value of href, text and file', async () => {
    const content = await mdLinks(path, { validate: false })
    expect(content).toEqual(arrayLinks)
  })
 
 })


