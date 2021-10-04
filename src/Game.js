import React, { Component } from 'react'
import Board from './components/Board';
import BoardController from './components/BoardController';
import SmallButtons from './components/smallButtons';
import './css/index.css';
import './css/Board.css';

var data = {
    rows: 1,
    cols: 1,
    initialFillLimit: 3000,
    speed: 500,
}

class Game extends Component {
    constructor(props){
        super(props);
        this.speed = data.speed;
        this.rows = data.rows;
        this.cols = data.cols;
        this.autoPlay = false;
        this.lastadded = 0;
        this.state = {
            generation: 0,
            boxSize: 30,
            cells: 0,
            fillLimit: data.initialFillLimit,
            fullBoard: createBoard(this.rows, this.cols),
            population: 0,
        }
    }


    selectBox = (row, col) => {
        this.pauseButton();
        if ((this.state.population >= this.state.fillLimit) && !this.state.fullBoard[row][col]) return;
        let boardCopy = arrayClone(this.state.fullBoard);
        boardCopy[row][col] = !boardCopy[row][col];
        this.setState({
            fullBoard: boardCopy,
        }, () => {
            this.countCells();
        })
        
    }

    seed = () => {
        let boardCopy = arrayClone(this.state.fullBoard);
        for (let i=0; i<this.rows; i++){
          for (let j=0; j<this.cols; j++){
            if(Math.floor(Math.random() * 4) === 1){
              boardCopy[i][j] = true;
            }
          }
        }
        this.setState({
          fullBoard: boardCopy,
        }, () => {
            this.countCells();
        })
        
    }
    
    playButton = () => {
        clearInterval(this.intervalId);
        this.autoPlay = true;
        this.intervalId = setInterval(this.tick, this.speed);
    }

    pauseButton = () => {
        this.autoPlay = false;
        clearInterval(this.intervalId);
    }

    tickButton = () => {
        this.pauseButton();
        this.tick();
    }

    buyutbuton = () => {
        this.pauseButton();
        this.rows+=2;
        this.cols+=2;

        this.setState({
            fullBoard: createBoard(this.rows, this.cols),
        })
    }

    setSpeed = (spd) => {
        this.speed = spd;
        if(this.autoPlay){
            this.pauseButton();
            this.playButton();
        }
    }

    plusButton = () => {
        this.setState({
            boxSize: this.state.boxSize + 3
        })
    }
    minusButton = () => {
        this.setState({
            boxSize: this.state.boxSize - 3
        })
    }

    countCells = () => {
        let total = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
              if (this.state.fullBoard[i][j]) total++;
            }
          }
        this.setState({
            population: total,
        });
    }

    tick = () => {
        let b = performance.now();
        if (this.state.population === 0){
            this.pauseButton(); 
            return;
        }
        let g = this.state.fullBoard;
        let g2 = arrayClone(this.state.fullBoard);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
              let count = 0;
              if (i > 0) if (g[i - 1][j]) count++;
              if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
              if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
              if (j < this.cols - 1) if (g[i][j + 1]) count++;
              if (j > 0) if (g[i][j - 1]) count++;
              if (i < this.rows - 1) if (g[i + 1][j]) count++;
              if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
              if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
              if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
              if (!g[i][j] && count === 3) g2[i][j] = true;
            }
          }
        

        this.setState({
            fullBoard: g2,
            generation: this.state.generation + 1,
            cells: this.state.cells + this.state.population,
        }, () => {
            this.lastadded = this.state.population;
            this.countCells();
            let a = performance.now();
            console.log(Math.floor(a - b));
        });
        

    }

    mainLoop = () => {
        this.tick();
        
    }
    

    componentDidMount() {
        this.playButton();
    }

    render() {
        var a ="";
        a = (this.state.population > this.state.fillLimit) ? "overLimited" : ""
        return (
            <div>
                <div className="game">
                    <Board
                        fullBoard = {this.state.fullBoard}
                        rows = {this.rows}
                        cols = {this.cols}
                        selectBox = {this.selectBox}
                        boxSize = {this.state.boxSize}
                    />
                    <BoardController
                        playButton = {this.playButton}
                        pauseButton = {this.pauseButton}
                        nextTick = {this.tickButton}
                        buyutbuton = {this.buyutbuton}
                    />
                    <SmallButtons
                        minusButton = {this.minusButton}
                        plusButton = {this.plusButton} 
                    />
                </div>
                <div className="currency1-card">
                    <h4>Total Cells</h4>
                    <h4>{this.state.cells} <span className="smallText">(+{this.lastadded})</span></h4>
                    <span>{this.state.fillLimit} of <span className={a}>{this.state.population} </span>filled</span>
                    <h4>Generation {this.state.generation}</h4>

                </div>
            </div>
        )
    }
}

function arrayClone (arr){
    let a = JSON.parse(JSON.stringify(arr));
    return a;
}

const createBoard = (rows, cols) => {
    return Array(rows).fill().map(() => Array(cols).fill(false));
}

export default Game;