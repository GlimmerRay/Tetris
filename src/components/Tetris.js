import React from "react";
import Grid from "./Grid.js";


// TODO: add movement
// TODO: stop game when shapes overflow at top
// TODO: add more shapes
// TODO: random position for new shapes at top
// TODO: add rotation
// TODO: different colors for different shapes
// TODO: check for filled row and decrement everything if so and points


// TODO: add notes (and maybe others) to .gitignore
// TODO: add type checking for input
// TODO: docs
function square(center) {
    var topLeft = center
    var topRight = [center[0], center[1]+1]
    var bottomLeft = [center[0]+1, center[1]]
    var bottomRight = [center[0]+1, center[1]+1]
    return [topLeft, topRight, bottomLeft, bottomRight]
}

// a 'shape' is a list of indices

export default class Tetris extends React.Component {
    constructor(props) {
        super(props)
        this.height = 15
        this.width = 15
        this.fallingSpeed = 500
        this.state = {
            staticGrid: this.makeEmptyGrid(this.height, this.width),
            shape: square([0, 5]),
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
            console.log('up key pressed')
        } else if (event.keyCode === 39) {
            this.moveShapeRight()
        } else if (event.keyCode === 40) {
            this.decrementShapePosition()
        }
    }

    moveShapeLeft() {
        var staticGrid = this.state.staticGrid
        var shape = this.state.shape
        var newShape = []
        for (var index of shape) {
            newShape.push([index[0], index[1]-1])
        }
        // if the shape is out of bounds off the left side of the grid
        // don't update it
        for (var index of newShape) {
            if (index[1] < 0) {
                return
            }
        }
        // if the shape is collding with another shape, don't update it
        for (var index of newShape) {
            if (staticGrid[index[0]][index[1]] == 1) {
                return
            }
        }
        // if all tests pass, update the shape
        this.setState({shape: newShape})
    }

    moveShapeRight() {
        var staticGrid = this.state.staticGrid
        var shape = this.state.shape
        var newShape = []
        for (var index of shape) {
            newShape.push([index[0], index[1]+1])
        }
        // if the shape is out of bounds off the left side of the grid
        // don't update it
        for (var index of newShape) {
            if (index[1] >= this.width) {
                return
            }
        }
        // if the shape is collding with another shape, don't update it
        for (var index of newShape) {
            if (staticGrid[index[0]][index[1]] == 1) {
                return
            }
        }
        // if all tests pass, update the shape
        this.setState({shape: newShape})
    }

    // TODO: order the functions in a nice way
    // TODO: do all functions need to be defined in this class?
    // maybe we only need state updating functions in here and others can be utils
    componentWillUnmount() {
        clearInterval(this.dropShape)
    }

    decrementShapePosition() {
        var shape = this.state.shape
        var newShape = []
        var count = this.state.count
        for (var index of shape) {
            newShape.push([index[0]+1, index[1]])
        }
        if (!this.collides(newShape)) {
            this.setState({shape: newShape, count: count+1})
        // TODO: make this also work for conflicts in general, not just
        // conflicts with bottom of grid
        } else {
            this.addShapeToStatic(shape)
        }
    }

    // TODO: study == vs. ====
    // TODO: make shape indexing easier
    // returns true of any indices of shape are in staticGrid else false
    collides(shape) {
        var staticGrid = this.state.staticGrid
        if (this.bottomYPosition(shape) >= this.height) {
            return true
        }
        for (var index of shape) {
            if (staticGrid[index[0]][index[1]] == 1) {
                return true
            }
        }
        return false
    }

    // TODO: make a general out of bounds error
    addShapeToStatic(shape) {
        var grid = this.state.staticGrid
        for (var index of shape) {
            grid[index[0]][index[1]] = 1
        }
        this.setState({staticGrid: grid, shape: square([0, 7])})
    }

    bottomYPosition(shape) {
        var max = -1
        for (var index of shape) {
            if (index[0] > max) {
                max = index[0]
            }
        }
        return max
    }

    makeEmptyGrid(height, width) {
        var rows = []
        for (var row = 0; row < height; row++) {
            rows.push([])
            for (var col = 0; col < width; col++) {
                rows[row].push(0)
            }
        }
        return rows
    }

    joinShapeGrid(shape) {
        var grid = this.makeEmptyGrid(this.height, this.width)
        for (var i = 0; i<shape.length; i++) {
            grid[shape[i][0]][shape[i][1]] = 1
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

    render() {
        var grid = this.joinShapeGrid(this.state.shape)
        return <Grid values={grid} />
    }
}