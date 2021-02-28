import React from "react";


// A Grid is intended to display a grid of squares of different colors.
// It takes a 2d array of integers, each unique integer i in that array
// maps the corresponding className colorClasses[i]

// TODO:
// -need to ensure that no value in grid is larger than the number
// of colorClasses
// -should we actually store a state rather than regenerating each time?
// (could be important for speeding up larger grids)

export default class Grid extends React.Component {
    constructor(props) {
        super(props)
        this.colorClasses = this.props.colorClasses
    }

    makeGrid(grid) {
        var rows = []
        for (var i = 0; i < grid.length; i++) {
            var row = []
            for (var j = 0; j < grid[0].length; j++) {
                var colorClass = this.colorClasses[grid[i][j]]
                row.push(<td key={"col" + i + j} className={colorClass}></td>)
            }
            rows.push(<tr key={"row" + i}>{row}</tr>)
        }
        return <table className={this.props.className}><tbody>{rows}</tbody></table>
    }

    render() {
        return this.makeGrid(this.props.grid)
    }
}