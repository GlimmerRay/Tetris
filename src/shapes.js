export class Line {

    constructor() {
        this.color = 1
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
        var square1 = [centerX, centerY-1]
        var square2 = [centerX, centerY]
        var square3 = [centerX, centerY+1]
        var square4 = [centerX, centerY+2]
        return [square1, square2, square3, square4]
    }

    makeRotationTwo(centerX, centerY) {
        var square1 = [centerX-1, centerY]
        var square2 = [centerX, centerY]
        var square3 = [centerX+1, centerY]
        var square4 = [centerX+2, centerY]
        return [square1, square2, square3, square4]
    }

    makeRotationThree(centerX, centerY) {
        var square1 = [centerX, centerY+1]
        var square2 = [centerX, centerY]
        var square3 = [centerX, centerY-1]
        var square4 = [centerX, centerY-2]
        return [square1, square2, square3, square4]
    }

    makeRotationFour(centerX, centerY) {
        var square1 = [centerX+1, centerY]
        var square2 = [centerX, centerY]
        var square3 = [centerX-1, centerY]
        var square4 = [centerX-2, centerY]
        return [square1, square2, square3, square4]
    }
}

export class TeeShape {

    constructor() {
        this.color = 2
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

    makeRotationFour(centerX, centerY) {
        var square1 = [centerX, centerY+1]
        var square2 = [centerX, centerY]
        var square3 = [centerX, centerY-1]
        var square4 = [centerX-1, centerY]
        return [square1, square2, square3, square4]
    }

    makeRotationOne(centerX, centerY) {
        var square1 = [centerX+1, centerY]
        var square2 = [centerX, centerY]
        var square3 = [centerX-1, centerY]
        var square4 = [centerX, centerY-1]
        return [square1, square2, square3, square4]
    }

    makeRotationTwo(centerX, centerY) {
        var square1 = [centerX, centerY-1]
        var square2 = [centerX, centerY]
        var square3 = [centerX, centerY+1]
        var square4 = [centerX+1, centerY]
        return [square1, square2, square3, square4]
    }

    makeRotationThree(centerX, centerY) {
        var square1 = [centerX-1, centerY]
        var square2 = [centerX, centerY]
        var square3 = [centerX+1, centerY]
        var square4 = [centerX, centerY+1]
        return [square1, square2, square3, square4]
    }
}

export class SnakeShapeRight {

    constructor() {
        this.color = 3
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
        var square1 = [centerX+1, centerY]
        var square2 = [centerX, centerY]
        var square3 = [centerX, centerY-1]
        var square4 = [centerX-1, centerY-1]
        return [square1, square2, square3, square4]
    }
    
    makeRotationTwo(centerX, centerY) {
        var square1 = [centerX, centerY+1]
        var square2 = [centerX, centerY]
        var square3 = [centerX-1, centerY]
        var square4 = [centerX-1, centerY-1]
        return [square1, square2, square3, square4]
    }

    makeRotationThree(centerX, centerY) {
        var square1 = [centerX-1, centerY]
        var square2 = [centerX, centerY]
        var square3 = [centerX, centerY+1]
        var square4 = [centerX+1, centerY+1]
        return [square1, square2, square3, square4]
    }

    makeRotationFour(centerX, centerY) {
        var square1 = [centerX, centerY-1]
        var square2 = [centerX, centerY]
        var square3 = [centerX+1, centerY]
        var square4 = [centerX+1, centerY+1]
        return [square1, square2, square3, square4]
    }
}

export class SnakeShapeLeft {

    constructor() {
        this.color = 3
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
        var square1 = [centerX+1, centerY-1]
        var square2 = [centerX, centerY-1]
        var square3 = [centerX, centerY]
        var square4 = [centerX-1, centerY]
        return [square1, square2, square3, square4]
    }

    makeRotationTwo(centerX, centerY) {
        var square1 = [centerX, centerY+1]
        var square2 = [centerX, centerY]
        var square3 = [centerX+1, centerY]
        var square4 = [centerX+1, centerY-1]
        return [square1, square2, square3, square4]
    }

    makeRotationThree(centerX, centerY) {
        var square1 = [centerX-1, centerY]
        var square2 = [centerX, centerY]
        var square3 = [centerX, centerY-1]
        var square4 = [centerX+1, centerY-1]
        return [square1, square2, square3, square4]
    }

    makeRotationFour(centerX, centerY) {
        var square1 = [centerX, centerY-1]
        var square2 = [centerX, centerY]
        var square3 = [centerX-1, centerY]
        var square4 = [centerX-1, centerY+1]
        return [square1, square2, square3, square4]
    }
}

export class LShapeRight {

    constructor() {
        this.color = 4
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
        var square1 = [centerX+1, centerY]
        var square2 = [centerX, centerY]
        var square3 = [centerX-1, centerY]
        var square4 = [centerX-1, centerY-1]
        return [square1, square2, square3, square4]
    }

    makeRotationTwo(centerX, centerY) {
        var square1 = [centerX, centerY+1]
        var square2 = [centerX, centerY]
        var square3 = [centerX, centerY-1]
        var square4 = [centerX+1, centerY+1]
        return [square1, square2, square3, square4]
    }

    makeRotationThree(centerX, centerY) {
        var square1 = [centerX-1, centerY]
        var square2 = [centerX, centerY]
        var square3 = [centerX+1, centerY]
        var square4 = [centerX+1, centerY+1]
        return [square1, square2, square3, square4]
    }

    makeRotationFour(centerX, centerY) {
        var square1 = [centerX, centerY-1]
        var square2 = [centerX, centerY]
        var square3 = [centerX, centerY+1]
        var square4 = [centerX-1, centerY-1]
        return [square1, square2, square3, square4]
    }
}

export class LShapeLeft {

    constructor() {
        this.color = 4
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
        var square1 = [centerX-1, centerY]
        var square2 = [centerX, centerY]
        var square3 = [centerX+1, centerY]
        var square4 = [centerX+1, centerY-1]
        return [square1, square2, square3, square4]
    }

    makeRotationTwo(centerX, centerY) {
        var square1 = [centerX, centerY+1]
        var square2 = [centerX, centerY]
        var square3 = [centerX, centerY-1]
        var square4 = [centerX-1, centerY+1]
        return [square1, square2, square3, square4]
    }

    makeRotationThree(centerX, centerY) {
        var square1 = [centerX+1, centerY]
        var square2 = [centerX, centerY]
        var square3 = [centerX-1, centerY]
        var square4 = [centerX-1, centerY+1]
        return [square1, square2, square3, square4]
    }

    makeRotationFour(centerX, centerY) {
        var square1 = [centerX, centerY-1]
        var square2 = [centerX, centerY]
        var square3 = [centerX, centerY+1]
        var square4 = [centerX+1, centerY-1]
        return [square1, square2, square3, square4]
    }
}


export class Square {

    constructor() {
        this.color = 5
    }

    makeIndices(centerX, centerY, rotation) {
        if (rotation === 0) {
            return this.makeRotationOne(centerX, centerY)
        } else if (rotation === 1) {
            return this.makeRotationOne(centerX, centerY)
        } else if (rotation === 2) {
            return this.makeRotationOne(centerX, centerY)
        } else if (rotation == 3) {
            return this.makeRotationOne(centerX, centerY)
        }
    }

    makeRotationOne(centerX, centerY) {
        var topLeft = [centerX, centerY-1]
        var topRight = [centerX, centerY]
        var bottomLeft = [centerX+1, centerY-1]
        var bottomRight = [centerX+1, centerY]
        return [topLeft, topRight, bottomLeft, bottomRight]
    }
}