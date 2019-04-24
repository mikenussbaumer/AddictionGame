const fs = require('fs');
const path = require('path');

function parseInputData(file) {
    const filePath = path.join(__dirname, "tests", file);
    const parsedData = fs.readFileSync(filePath).toString().trim().split(" ").map(Number);
    return parsedData;
}

function getPosition(data, number) {

    const rows = data[0];
    const cols = data[1];

    const gameBoard = createGameBoard(rows, cols);
    const indexOfNumber = findIndexOfItemIn2DArray(gameBoard, number);

    return indexOfNumber;
}

function getAllPositions(data) {
    let positions = [];

    const rows = data.shift();
    const cols = data.shift();
    const numberOfPositions = data.shift();

    for (let i = 0; i < numberOfPositions; i++) {
        const element = data[(i)];
        positions[i] = getPosition([rows, cols, numberOfPositions, ...data], element);
    }

    return positions.toString().split(',').map(Number);
}

function createGameBoard(rows, cols) {
    let array = [];
    let counter = 1;
    for (let i = 0; i < rows; i++) {
        array[i] = [];
        for (let j = 0; j < cols; j++) {
            array[i][j] = counter;
            counter++;
        }
    }

    return array;
}

function findIndexOfItemIn2DArray(array, item) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            const element = array[i][j];
            if (element == item) return [i + 1, j + 1];
        }
    }
    return [];
}

function arrayTo2DArray(array, splitNumber) {
    var idx = 0
    result = []

    while (idx < array.length) {
        if (idx % splitNumber === 0) result.push([])
        result[result.length - 1].push(array[idx++])
    }

    return result
}

function getManhattenDistances(data) {

    const rows = data.shift();
    const cols = data.shift();
    const numberOfPositions = data.shift();
    const points = arrayTo2DArray(data, 2).sort((a, b) => {
        if (a[1] === b[1]) {
            return 0;
        } else {
            return (a[1] < b[1]) ? -1 : 1;
        }
    });

    let manhattenDistances = [];
    let counter = 0;
    for (let i = 0; i < points.length; i += 2) {
        const point1 = getPosition([rows, cols, numberOfPositions, ...data], points[i][0]);
        const point2 = getPosition([rows, cols, numberOfPositions, ...data], points[i + 1][0]);

        manhattenDistances[counter] = Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
        counter++;
    }

    return manhattenDistances;
}

module.exports = { getAllPositions, getManhattenDistances, parseInputData };