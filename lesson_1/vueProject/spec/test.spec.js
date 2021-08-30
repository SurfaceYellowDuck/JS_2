const capitalizeString = require('../jasmine/test').capitalizeString;

describe('Test test.js', () => {
    describe('test capitalizeString()', () => {
        it('should return Nikita', () => {
            expect(capitalizeString('niKiTa')).toBe('Nikita')
        })
        it('shoul return  "Nikita Lukonenko"', () => {
            expect(capitalizeString('nIkiTa lUkoNenKO')).toBe('Nikita Lukonenko')
        })
        it('shoul return  "Nikita Lukonenko-Alexeev"', () => {
            expect(capitalizeString('nIkiTa lUkoNenKO-aLexEeV')).toBe('Nikita Lukonenko-Alexeev')
        })
    })
})