import React from "react";
import Grid from "./Grid.js";
import { Line, TeeShape, SnakeShapeRight, SnakeShapeLeft,
LShapeRight, LShapeLeft, Square } from "../shapes.js";


// TODO: different colors for different shapes
// todo: beveled edges
// TODO: game over when overflow at top
// TODO: increment points when row filled
// TODO: sound when row filled
// TODO: display points
// TODO: speed up with point total (new level every four points)
// TODO: soft code the rotations


export default class Tetris extends React.Component {
    constructor(props) {
        super(props)
        this.gridWidth = 10
        this.gridHeight = 20
        this.fallingSpeed = 500
        this.allShapes = [new Line(), new TeeShape(), new SnakeShapeRight(), new SnakeShapeLeft(),
        new LShapeRight(), new LShapeLeft(), new Square()]
        this.state = {
            staticGrid: this.makeEmptyGrid(this.gridHeight, this.gridWidth),
            shape: this.getRandomShape(),
            centerX: 4,
            centerY: 1,
            rotation: 0,
        }
    }

    componentDidMount() {
        this.dropShape = setInterval(this.decrementShapePosition.bind(this), this.fallingSpeed)
        window.addEventListener('keydown', this.handleUserInput.bind(this))
    }

    componentWillUnmount() {
        clearInterval(this.dropShape)
    }

    handleUserInput(event) {
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

    collides(centerX, centerY, rotation) {
        var staticGrid = this.state.staticGrid
        var shapeIndices = this.state.shape.makeIndices(centerX, centerY, rotation)
        for (var index of shapeIndices) {
            if (index[0] < 0 || index[0] >= this.gridWidth || index[1] >= this.gridHeight)  {
                return true
            }
            
            // staticGrid[index[1]][index[0]] == 1
            if (staticGrid[index[1]][index[0]] != 0) {
                return true
            }
        }
        return false
    }

    freezeShape(shapeIndices) {
        var grid = this.state.staticGrid
        // vvv was not here before vvv
        var shape = this.state.shape
        for (var index of shapeIndices) {
            // grid[index[1]][index[0]] = 1
            grid[index[1]][index[0]] = shape.color
        }
        var newShape = this.getRandomShape()
        var filledRows = this.getFilledRows(grid)
        if (filledRows.length != 0) {
            grid = this.removeFilledRows(grid, filledRows)
        }
        this.setState({staticGrid: grid, centerX: 7, centerY: 1, shape: newShape,
        rotation: 0})
    }

    removeFilledRows(grid, filledRows) {
        filledRows.sort(function(a,b) {return b-a})
        var count = 0
        for (var rowNum of filledRows) {    
            grid.splice(rowNum+count, 1)
            grid.splice(0, 0, [0,0,0,0,0,0,0,0,0,0])
            count += 1
        }
        return grid
    }

    getFilledRows(grid) {
        var filledRows = []
        for (var i=0; i<grid.length; i++) {
            if (this.isFilledRow(grid[i])) {
                filledRows.push(i)
            }
        }
        return filledRows
    }

    isFilledRow(row) {
        for (var cell of row) {
            if (cell === 0) {
                return false
            }
        }
        return true
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
        for (var index of shapeIndices) {
            // grid[index[1]][index[0]] = 1
            grid[index[1]][index[0]] = this.state.shape.color
        }
        for (var i = 0; i < this.state.staticGrid.length; i++) {
            for (var j=0; j < this.state.staticGrid[0].length; j++) {
                // if (this.state.staticGrid[i][j] == 1)
                if (this.state.staticGrid[i][j] != 0) {
                    grid[i][j] = this.state.staticGrid[i][j]
                    // grid[i][j] = 1
                }
            }
        }
        return grid
    }

    getShapeIndices(centerX, centerY, rotation) {
        return this.state.shape.makeIndices(centerX, centerY, rotation)
    }

    getCurrentShapeIndices() {
        var centerX = this.state.centerX
        var centerY = this.state.centerY
        var rotation = this.state.rotation
        return this.getShapeIndices(centerX, centerY, rotation)
    }

    getRandomShape() {
        var randomIndex = Math.floor(Math.random()*this.allShapes.length)
        var newShape = this.allShapes[randomIndex]
        return newShape
    }

    render() {
        var grid = this.joinShapeGrid(this.getCurrentShapeIndices())
        return <Grid values={grid} colorClasses={["colorZero", "colorOne", "colorTwo", "colorThree",
        "colorFour", "colorFive"]}/>
    }
}