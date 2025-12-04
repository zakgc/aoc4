var fs = require('fs');

let rollsTxt = fs.readFileSync('./rolls.txt', 'utf-8').replaceAll('\r', '')
let rollsArr = rollsTxt.split('\n')
let rollMatrix = []
rollsArr.forEach(roll => {
    rollMatrix.push(roll.split(''))
})

const directions = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
]

function getMatrixData(rollMatrix){
    let matrixData = []
    let xLength = rollMatrix[0].length
    let yLength = rollMatrix.length

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

    return matrixData
}

function removeRolls(rollMatrix, matrixData){
    let removed = 0
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
            removed +=1

            rollMatrix[data.position.x][data.position.y] = '!'
        }
    })
    return rollMatrix, removed
}

let ans = 0
for (let i = 0; i < 1000; i++) {
    let matrixData = getMatrixData(rollMatrix)

    rollMatrix, removed = removeRolls(rollMatrix, matrixData)
    ans += removed

    if (removed === 0) {
        console.log(ans);
        break
    }
}