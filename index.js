var fs = require('fs');

let rollsTxt = fs.readFileSync('./rolls.txt', 'utf-8').replaceAll('\r', '')
let rollsArr = rollsTxt.split('\n')
let rollMatrix = []
rollsArr.forEach(roll => {
    rollMatrix.push(roll.split(''))
})

let xLength = rollMatrix[0].length
let yLength = rollMatrix.length

let matrixData = []
const directions = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
]

for (let x = 0; x < xLength; x++) {
    for (let y = 0; y < yLength; y++) {
        let adjacent = []

        for (const [dx, dy] of directions) {
            const newX = parseInt(x + dx);
            const newY = parseInt(y + dy);

            if (newX >= 0 && newX < rollMatrix.length && newY >= 0 && newY < rollMatrix[0].length) {
                adjacent.push(rollMatrix[newX][newY]);
            }
        }

        matrixData.push({
            position: {
                x, y
            },
            value: rollMatrix[x][y],
            adjacent
        })
    }
}

let ans = 0

matrixData.forEach(data => {
    if(data.value !== '@') {
        return
    }

    let adjRolls = 0
    data.adjacent.forEach(ele => {
        if(ele === '@'){
            adjRolls += 1
        }
    })

    if (adjRolls < 4){
        ans +=1
    }
})

console.log(ans);
