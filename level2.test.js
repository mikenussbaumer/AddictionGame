const index = require('./index');

for (let i = 0; i < 3; i++) {
    test(`get Manhatten distances (${i})`, () => {
        expect(index.getManhattenDistances(index.parseInputData(`level2-${i}.in`))).toEqual(index.parseInputData(`level2-${i}.out`));
    });
}