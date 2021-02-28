
class Shape {
    constructor(coords, color) {
        this.coords = coords
        this.color = color
    }

    makeIndices(centerX, centerY, rotation) {
        if (rotation === 0) {
            return this.makeRotationOne(centerX, centerY)
        } else if (rotation === 1) {
            return this.makeRotationTwo(centerX, centerY)
        } else if (rotation === 2) {
            return this.makeRotationThree(centerX, centerY)
        } else if (rotation == 3) {
            return this.makeRotationFour(centerX, centerY)
        }
    }

    makeRotationOne(centerX, centerY) {
        return this.coords.map(coord => [centerX+coord[0], centerY+coord[1]])
    }

    makeRotationTwo(centerX, centerY) {
        return this.coords.map(coord => [centerX+coord[1], centerY+coord[0]])
    }

    makeRotationThree(centerX, centerY) {
        return this.coords.map(coord => [centerX-coord[0], centerY-coord[1]])
    }

    makeRotationFour(centerX, centerY) {
        return this.coords.map(coord => [centerX-coord[1], centerY-coord[0]])
    }

}

export var Line = new Shape([[0, -1], [0, 0], [0, 1], [0, 2]], 1)
export var TeeShape = new Shape([[0, 1], [0, 0], [0, -1], [-1, 0]], 2)
export var SnakeShapeRight = new Shape([[1, 0], [0, 0], [0, -1], [-1, -1]], 3)
export var SnakeShapeLeft = new Shape([[1, -1], [0, -1], [0, 0], [-1, 0]], 3)
export var LShapeRight = new Shape([[1, 0], [0, 0], [-1, 0], [-1, -1]], 4)
export var LShapeLeft = new Shape([[-1, 0], [0, 0], [1, 0], [1, -1]], 4)
export var Square = new Shape([[0, -1], [0, 0], [1, -1], [1, 0]], 5)


// export class LShapeRight {

//     constructor() {
//         this.color = 4
//     }

//     makeIndices(centerX, centerY, rotation) {
//         if (rotation === 0) {
//             return this.makeRotationOne(centerX, centerY)
//         } else if (rotation === 1) {
//             return this.makeRotationTwo(centerX, centerY)
//         } else if (rotation === 2) {
//             return this.makeRotationThree(centerX, centerY)
//         } else if (rotation == 3) {
//             return this.makeRotationFour(centerX, centerY)
//         }
//     }
    
//     [[1, 0], [0, 0], [-1, 0], [-1, -1]]
//     makeRotationOne(centerX, centerY) {
//         var square1 = [centerX+1, centerY]
//         var square2 = [centerX, centerY]
//         var square3 = [centerX-1, centerY]
//         var square4 = [centerX-1, centerY-1]
//         return [square1, square2, square3, square4]
//     }

//     makeRotationTwo(centerX, centerY) {
//         var square1 = [centerX, centerY+1]
//         var square2 = [centerX, centerY]
//         var square3 = [centerX, centerY-1]
//         var square4 = [centerX+1, centerY+1]
//         return [square1, square2, square3, square4]
//     }

//     makeRotationThree(centerX, centerY) {
//         var square1 = [centerX-1, centerY]
//         var square2 = [centerX, centerY]
//         var square3 = [centerX+1, centerY]
//         var square4 = [centerX+1, centerY+1]
//         return [square1, square2, square3, square4]
//     }

//     makeRotationFour(centerX, centerY) {
//         var square1 = [centerX, centerY-1]
//         var square2 = [centerX, centerY]
//         var square3 = [centerX, centerY+1]
//         var square4 = [centerX-1, centerY-1]
//         return [square1, square2, square3, square4]
//     }
// }

// export class LShapeLeft {

//     constructor() {
//         this.color = 4
//     }

//     makeIndices(centerX, centerY, rotation) {
//         if (rotation === 0) {
//             return this.makeRotationOne(centerX, centerY)
//         } else if (rotation === 1) {
//             return this.makeRotationTwo(centerX, centerY)
//         } else if (rotation === 2) {
//             return this.makeRotationThree(centerX, centerY)
//         } else if (rotation == 3) {
//             return this.makeRotationFour(centerX, centerY)
//         }
//     }

//     [[-1, 0], [0, 0], [1, 0], [1, -1]]
//     makeRotationOne(centerX, centerY) {
//         var square1 = [centerX-1, centerY]
//         var square2 = [centerX, centerY]
//         var square3 = [centerX+1, centerY]
//         var square4 = [centerX+1, centerY-1]
//         return [square1, square2, square3, square4]
//     }

//     makeRotationTwo(centerX, centerY) {
//         var square1 = [centerX, centerY+1]
//         var square2 = [centerX, centerY]
//         var square3 = [centerX, centerY-1]
//         var square4 = [centerX-1, centerY+1]
//         return [square1, square2, square3, square4]
//     }

//     makeRotationThree(centerX, centerY) {
//         var square1 = [centerX+1, centerY]
//         var square2 = [centerX, centerY]
//         var square3 = [centerX-1, centerY]
//         var square4 = [centerX-1, centerY+1]
//         return [square1, square2, square3, square4]
//     }

//     makeRotationFour(centerX, centerY) {
//         var square1 = [centerX, centerY-1]
//         var square2 = [centerX, centerY]
//         var square3 = [centerX, centerY+1]
//         var square4 = [centerX+1, centerY-1]
//         return [square1, square2, square3, square4]
//     }
// }


// export class Square {

//     constructor() {
//         this.color = 5
//     }  
    
//     makeIndices(centerX, centerY, rotation) {
//         if (rotation === 0) {
//             return this.makeRotationOne(centerX, centerY)
//         } else if (rotation === 1) {
//             return this.makeRotationOne(centerX, centerY)
//         } else if (rotation === 2) {
//             return this.makeRotationOne(centerX, centerY)
//         } else if (rotation == 3) {
//             return this.makeRotationOne(centerX, centerY)
//         }
//     }

//     [[0, -1], [0, 0], [1, -1], [1, 0]]
//     makeRotationOne(centerX, centerY) {
//         var topLeft = [centerX, centerY-1]
//         var topRight = [centerX, centerY]
//         var bottomLeft = [centerX+1, centerY-1]
//         var bottomRight = [centerX+1, centerY]
//         return [topLeft, topRight, bottomLeft, bottomRight]
//     }
// }