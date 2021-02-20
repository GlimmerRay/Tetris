import React from "react";
import Grid from "./Grid.js";
import { Line } from "../shapes.js";

// TODO: make each shape a class
// TODO: stop game when shapes overflow at top
// TODO: random position for new shapes at top
// TODO: add rotation
// TODO: different colors for different shapes
// TODO: check for filled row and decrement everything if so and points
// TODO: beveled edges


// TODO: add notes (and maybe others) to .gitignore
// TODO: add type checking for input
// TODO: docs
// function square(center) {
//     var topLeft = center
//     var topRight = [center[0], center[1]+1]
//     var bottomLeft = [center[0]+1, center[1]]
//     var bottomRight = [center[0]+1, center[1]+1]
//     return [topLeft, topRight, bottomLeft, bottomRight]
// }

// function line(center) {
//     var square1 = [center[0], center[1]-1]
//     var square2 = center
//     var square3 = [center[0], center[1]+1]
//     var square4 = [center[0], center[1]+2]
//     return [square1, square2, square3, square4]
// }



// function teeShape(center) {
//     var square1 = [center[0], center[1]-1]
//     var square2 = center
//     var square3 = [center[0], center[1]+1]
//     var square4 = [center[0]+1, center[1]]
//     return [square1, square2, square3, square4]
// }

// function snakeShapeRight(center) {
//     var square1 = center
//     var square2 = [center[0]+1, center[1]]
//     var square3 = [center[0]+1, center[1]+1]
//     var square4 = [center[0]+2, center[1]+1]
//     return [square1, square2, square3, square4]
// }

// function snakeShapeLeft(center) {
//     var square1 = center
//     var square2 = [center[0]+1, center[1]]
//     var square3 = [center[0]+1, center[1]-1]
//     var square4 = [center[0]+2, center[1]-1]
//     return [square1, square2, square3, square4]
// }

// function lShapeRight(center) {
//     var square1 = center
//     var square2 = [center[0]+1, center[1]]
//     var square3 = [center[0]+2, center[1]]
//     var square4 = [center[0]+2, center[1]+1]
//     return [square1, square2, square3, square4]
// }

// function lShapeLeft(center) {
//     var square1 = center
//     var square2 = [center[0]+1, center[1]]
//     var square3 = [center[0]+2, center[1]]
//     var square4 = [center[0]+2, center[1]-1]
//     return [square1, square2, square3, square4]
// }

// a 'shape' is a list of indices

export default class Tetris extends React.Component {
    constructor(props) {
        super(props)
        this.gridHeight = 15
        this.gridWidth = 15
        this.fallingSpeed = 500
        this.state = {
            staticGrid: this.makeEmptyGrid(this.gridHeight, this.gridWidth),
            shape: new Line(),
            centerX: 8,
            centerY: 2,
            rotation: 0,
            count: 0
        }
    }

    componentDidMount() {
        this.dropShape = setInterval(this.decrementShapePosition.bind(this), this.fallingSpeed)
        window.addEventListener('keydown', this.handleKeyDown.bind(this))
    }
    // TODO: research are keycodes consistent across browsers??
    // TODO: what is the best way to handle key events?
    // do you add listner to window? etc...
    handleKeyDown(event) {
        if (event.keyCode === 37) {
            this.moveShapeLeft()
        } else if (event.keyCode === 38) {
            this.rotate()
        } else if (event.keyCode === 39) {
            this.moveShapeRight()
        } else if (event.keyCode === 40) {
            this.decrementShapePosition()
        }
    }

    rotate() {
        var centerX = this.state.centerX
        var centerY = this.state.centerY
        var rotation = this.state.rotation
        if (rotation >= 3) {
            var newRotation = 0
        } else {
            var newRotation = rotation + 1
        }
        if (!(this.collides(centerX, centerY, newRotation))) {
            this.setState({rotation: newRotation})
        } else {
            ;
        }
    }

    moveShapeLeft() {
        var newCenterX = this.state.centerX - 1
        var centerY = this.state.centerY
        var rotation = this.state.rotation
        if (!(this.collides(newCenterX, centerY, rotation))) {
            this.setState({centerX: newCenterX})
        } else {
            ;
        }
    }

    moveShapeRight() {
        var newCenterX = this.state.centerX + 1
        var centerY = this.state.centerY
        var rotation = this.state.rotation
        if (!(this.collides(newCenterX, centerY, rotation))) {
            this.setState({centerX: newCenterX})
        } else {
            ;
        }
    }

    // TODO: order the functions in a nice way
    // TODO: do all functions need to be defined in this class?
    // maybe we only need state updating functions in here and others can be utils
    componentWillUnmount() {
        clearInterval(this.dropShape)
    }

    decrementShapePosition() {
        var centerX = this.state.centerX
        var centerY = this.state.centerY
        var newCenterY = this.state.centerY + 1
        var rotation = this.state.rotation
        if (!this.collides(centerX, newCenterY, rotation)) {
            this.setState({centerY: newCenterY})
        } else {
            this.freezeShape(this.getShapeIndices(centerX, centerY, rotation))
        }
    }

    // TODO: study == vs. ====
    // TODO: make shape indexing easier
    // returns true of any indices of shape are in staticGrid else false
    collides(centerX, centerY, rotation) {
        var staticGrid = this.state.staticGrid
        var shapeIndices = this.state.shape.makeIndices(centerX, centerY, rotation)
        if (this.bottomYPosition(shapeIndices) >= this.gridHeight) {
            return true
        }
        for (var index of shapeIndices) {
            if (staticGrid[index[1]][index[0]] == 1) {
                return true
            }
            if (index[0] < 0 || index[0] >= this.gridWidth)  {
                return true
            }
        }
        return false
    }

    // TODO: make a general out of bounds error

    // add shape to the grid, reset center
    freezeShape(shape) {
        console.log(shape)
        var grid = this.state.staticGrid
        for (var index of shape) {
            console.log(shape)
            grid[index[1]][index[0]] = 1
        }
        this.setState({staticGrid: grid, centerX: 7, centerY: 2})
    }

    bottomYPosition(shape) {
        var max = -1
        for (var index of shape) {
            if (index[1] > max) {
                max = index[1]
            }
        }
        return max
    }

    makeEmptyGrid(gridHeight, gridWidth) {
        var rows = []
        for (var row = 0; row < gridHeight; row++) {
            rows.push([])
            for (var col = 0; col < gridWidth; col++) {
                rows[row].push(0)
            }
        }
        return rows
    }

    joinShapeGrid(shapeIndices) {
        var grid = this.makeEmptyGrid(this.gridHeight, this.gridWidth)
        for (var i = 0; i<shapeIndices.length; i++) {
            grid[shapeIndices[i][1]][shapeIndices[i][0]] = 1
        }
        for (var i = 0; i < this.state.staticGrid.length; i++) {
            for (var j=0; j < this.state.staticGrid[0].length; j++) {
                if (this.state.staticGrid[i][j] == 1) {
                    grid[i][j] = 1
                }
            }
        }
        return grid
    }

    getShapeIndices(centerX, centerY, rotation) {
        // var centerX = this.state.centerX
        // var centerY = this.state.centerY
        // var rotation = this.state.rotation
        return this.state.shape.makeIndices(centerX, centerY, rotation)
    }

    render() {
        // TODO: make a method for make Indices
        var grid = this.joinShapeGrid(this.getShapeIndices(this.state.centerX, this.state.centerY, this.state.rotation))
        return <Grid values={grid} />
    }
}