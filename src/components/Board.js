import React, { Component } from 'react'


class Box extends Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col)
    }
    
    render(){
        return(
            <div
                style={{fontSize: this.props.boxSize + 'px'}}
                className={this.props.boxClass}
                //this.props.id??
                onClick={this.selectBox}
            />
        );
    }
}

class Board extends Component {

    render(){
        var rowsArray = []
        var boxClass ="";

        for (var  i = 0; i < this.props.rows; i++) {
          var row = []

          for (var  j = 0; j < this.props.cols; j++){
            let k = i+"_"+j;
    
            boxClass = this.props.fullBoard[i][j] ? "box on" : "box off";
            row.push(
              <Box
                boxClass={boxClass}
                key={k}
                row={i}
                col={j}
                boxSize={this.props.boxSize}
                selectBox={this.props.selectBox}
              />
            );
          }
          rowsArray.push(
            <div className="row" key={'row: '+i}>{row}</div>
          )
        }
    
        return (
          <div className="board">
            {rowsArray}
          </div>
        );
      }
}

export default Board;