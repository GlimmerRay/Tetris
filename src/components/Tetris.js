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
    }

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
        // TODO: check for collision with botton AND static grid
        console.log(!this.collides(newShape))
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