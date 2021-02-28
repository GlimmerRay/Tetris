import React from "react";
import Grid from "./Grid.js";
import { Line, TeeShape, SnakeShapeRight, SnakeShapeLeft,
LShapeRight, LShapeLeft, Square } from "../shapes.js";

export default class Tetris extends React.Component {
    constructor(props) {
        super(props)
        this.gridWidth = 10
        this.gridHeight = 20
        this.fallingSpeed = 500
        this.allShapes = [Line, TeeShape, SnakeShapeRight, SnakeShapeLeft,
        LShapeRight, LShapeLeft, Square]
        this.state = {
            staticGrid: this.makeEmptyGrid(this.gridHeight, this.gridWidth),
            shape: this.getRandomShape(),
            centerX: 4,
            centerY: 1,
            rotation: 0,
            points: 0
        }
    }

    componentDidMount() {
        this.dropShape = setInterval(this.moveShapeDown.bind(this), this.fallingSpeed)
        window.addEventListener('keydown', this.handleUserInput.bind(this))
    }

    componentWillUnmount() {
        clearInterval(this.dropShape)
        console.log('unmount')
    }

    handleUserInput(event) {
        if (event.keyCode === 37) { // left arrow
            this.moveShapeLeft()
        } else if (event.keyCode === 38) { // up arrow
            this.rotate()
        } else if (event.keyCode === 39) { // right arrow
            this.moveShapeRight()
        } else if (event.keyCode === 40) { // down arrow
            this.moveShapeDown()
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

    moveShapeDown() {
        var centerX = this.state.centerX
        var centerY = this.state.centerY
        var newCenterY = this.state.centerY + 1
        var rotation = this.state.rotation
        // we check if then new shapeIndices collide before changing the state
        if (!this.collides(centerX, newCenterY, rotation)) {
            this.setState({centerY: newCenterY})
        } else {
            this.resetShape()
        }
    }

    collides(centerX, centerY, rotation) {
        var staticGrid = this.state.staticGrid
        var shapeIndices = this.state.shape.makeIndices(centerX, centerY, rotation)
        for (var index of shapeIndices) {
            if (index[0] < 0 || index[0] >= this.gridWidth || index[1] >= this.gridHeight)  {
                return true
            }
            if (staticGrid[index[1]][index[0]] != 0) {
                return true
            }
        }
        return false
    }

    resetShape() {
        grid = this.joinShapeGrid()
        var [grid, numFilledrows] = this.removeFilledRows(grid)
        var newShape = this.getRandomShape()
        var currentPoints = this.state.points
        this.setState({staticGrid: grid, 
            shape: newShape, 
            centerX: 4, 
            centerY: 1, 
            rotation: 0,
            points: currentPoints + numFilledrows})
    }

    removeFilledRows(grid) {
        var filledRows = this.getFilledRows(grid)
        filledRows.sort(function(a,b) {return b-a}) // we have to remove the rows in order
        var count = 0
        for (var rowNum of filledRows) {   
            grid.splice(rowNum+count, 1) // remove the row 
            grid.splice(0, 0, [0,0,0,0,0,0,0,0,0,0]) // put an empty row at the top
            count += 1
        }
        return [grid, filledRows.length]
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

    joinShapeGrid() {
        var shapeIndices = this.getCurrentShapeIndices()
        var grid = this.makeEmptyGrid(this.gridHeight, this.gridWidth)
        // copy static grid
        for (var i = 0; i < this.state.staticGrid.length; i++) {
            for (var j=0; j < this.state.staticGrid[0].length; j++) {
                grid[i][j] = this.state.staticGrid[i][j]
            }
        }
        // copy the current shape
        for (var index of shapeIndices) {
            grid[index[1]][index[0]] = this.state.shape.color
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
        var grid = this.joinShapeGrid()
        return <>
        <Grid className="tetris" grid={grid} 
        colorClasses={["colorZero", "colorOne", "colorTwo", "colorThree","colorFour", "colorFive"]}/>
        <div className="points">{this.state.points}</div>
        </>
    }
}