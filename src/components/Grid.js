import React from "react";

export default class Grid extends React.Component {
    constructor(props) {
        super(props)
        this.colorClasses = this.props.colorClasses
    }

    makeGrid(values) {
        var rows = []
        for (var i = 0; i < values.length; i++) {
            var row = []
            for (var j = 0; j < values[0].length; j++) {
                
                var colorClass = this.colorClasses[values[i][j]]

                // var name = values[i][j] ? "on-cell" : "off-cell" 
                // row.push(<td key={"col" + i + j}className={name}></td>)
                row.push(<td key={"col" + i + j}className={colorClass}></td>)
            }
            rows.push(<tr key={"row" + i}>{row}</tr>)
        }
        return <table><tbody>{rows}</tbody></table>
    }

    render() {
        const grid = this.makeGrid(this.props.values)
        return grid
    }
}