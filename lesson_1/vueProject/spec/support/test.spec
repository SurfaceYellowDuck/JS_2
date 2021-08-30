const capitalizeString = require('../test').capitalizeString;

describe('Test test.js', () => {
    describe('test capitalizeString()', () => {
        it('should return Nikita', () => {
            expect(capitalizeString('niKiTa')).toBe('Nikita')
        })
    })
})