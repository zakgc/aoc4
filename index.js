var fs = require('fs');

let rollsTxt = fs.readFileSync('./testrolls.txt', 'utf-8').replaceAll('\r', '')
let rollsArr = rollsTxt.split('\n')
let rollMatrix = []
rollsArr.forEach(roll => {
    rollMatrix.push(roll.split(''))
})

console.log(rollMatrix);
