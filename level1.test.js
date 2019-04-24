const index = require('./index');

for (let i = 0; i < 3; i++) {
    test(`get positions (${i})`, () => {
        expect(index.getAllPositions(index.parseInputData(`level1-${i}.in`))).toEqual(index.parseInputData(`level1-${i}.out`));
    });
}