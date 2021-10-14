import React, { Component } from 'react'
import SmallButtons from '../components/smallButtons'

class Box extends Component {
    selectBox = (r=true) => {
        this.props.selectBox(this.props.row, this.props.col, r);
    }
    
    render(){
        return(
            <div
                style={{fontSize: this.props.boxSize + 'px'}}
                className={this.props.boxClass}
                onClick={() => {
                  this.selectBox();
                }}
                onMouseDown={(e) => { 
                  console.log(e.buttons);
                  if(e.buttons === 2)
                    this.selectBox(false);
                }}
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
            let k = "k" + (i - (this.props.rows - 1) / 2 ) + "_" + (j - (this.props.cols - 1) / 2 ) + "_";
            boxClass = "box ";
            boxClass += this.props.fullBoard[i][j] ? "on" : "off";
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
          <div className="board-frame" onContextMenu={(e) => {
            e.preventDefault();
            }}>
            <div className="board">
              {rowsArray}
            </div>
            <SmallButtons
              plusButton = {this.props.plusButton}
              minusButton = {this.props.minusButton}
            />
          </div>
          
        );
      }
}

export default Board;