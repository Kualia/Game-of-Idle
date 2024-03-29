import React, { Component } from 'react'
import Board from './components/Board';
import BoardController from './components/BoardController';
import './css/index.css';
import './css/Board.css';

var data = {
    rows: 3,
    cols: 3,
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
        this.Xsymetry = false;
        this.Ysymetry = false;
        this.state = {
            Xsymetry: false,
            Ysymetry: false,
            generation: 0,
            boxSize: 30,
            cells: 0,
            fillLimit: data.initialFillLimit,
            fullBoard: createBoard(this.rows, this.cols),
            population: 0,
        }

        this.upgrades = {
            grid: {
                name: "Grid Upgrade",
                lvl: 0,
                price: 0,
            },

        }

        //this.upgrades.grid.price = gridPrice(this.upgrades.grid.lvl);
    }


    selectBox = (row, col, rv=true) => {
        let population = this.countCells();
        console.log("population: ", population);
        if ((population >= this.state.fillLimit) && !this.state.fullBoard[row][col]) return;
        this.pauseButton();
        let boardCopy = arrayClone(this.state.fullBoard);
        let selected = boardCopy[row][col];
        boardCopy[row][col] = !selected;

        if (rv) {
            let s = 0;
            let c, r;
            if (this.state.Ysymetry) {
                c = this.cols - (col+1);
                if(c !== col){
                    let b = boardCopy[row][c];
                    if (!b) s++;
                    if(b || population + s < this.state.fillLimit)
                        boardCopy[row][c] = !b;
                }   
            }
            if (this.state.Xsymetry) {
                r = this.rows - (row+1);
                if (r !== row) {
                    let b = boardCopy[r][col];
                    if (!b) s++;
                    if (b || population + s < this.state.fillLimit)
                        boardCopy[r][col] = !b;
                }
            }
            if (this.state.Xsymetry && this.state.Ysymetry) {
                if(r !== row && c !== col){
                    let b = boardCopy[r][c];
                    if (!b) s++;
                    if(b || population + s < this.state.fillLimit)
                        boardCopy[r][c] = !b;
                }    
            }
        }


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
              boardCopy[i][j] = false;
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
        let b = arrayClone(this.state.fullBoard);
        this.setState({
            fullBoard: createBoard(this.rows, this.cols),
        }, () =>{
            this.drawShape(1,1,b);
        });
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
            boxSize: Number((this.state.boxSize * 1.1).toFixed(3))
        }, () => {
            console.log(this.state.boxSize);
        })
    }
    minusButton = () => {
        if (this.state.boxSize < 15) return;
        this.setState({
            boxSize: Number((this.state.boxSize / 1.1).toFixed(3))
        }, () => {
            console.log(this.state.boxSize);
        })
    }
    setSymetry = (a, b) => {
        this.Xsymetry = a;
        this.Ysymetry = b;
        this.setState({
            Xsymetry: a,
            Ysymetry: b,
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
        return total;
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
    
    drawShape = (x,y,shape) => {
        let boardCopy = arrayClone(this.state.fullBoard);

        for(let i=0; i<shape.length; i++){
            for(let j=0; j<shape.length; j++){
                try {
                    boardCopy[i+x][j+y] = shape[i][j];
                }catch(err){
                    console.log(err);
                }
            }
        }

        this.setState({
            fullBoard: boardCopy,
        }, () => {
            this.countCells();
        })
    }


    swipeBoard = (pole='N') => {
        let boardCopy = arrayClone(this.state.fullBoard);
        let r;
        switch (pole) {
            case 'N':
                r = arrayRotate(boardCopy);
                break;
            case 'S':
                r = arrayRotate(boardCopy, true)
                break;
            case 'W':
                r = Array(this.rows).fill().map((val, i) => arrayRotate(boardCopy[i]));
                break;
            case 'E':
                r = Array(this.rows).fill().map((val, i) => arrayRotate(boardCopy[i], true));
                break;
            default:
                console.log("Unknown swipe");
                break;
        }
        this.setState({
            fullBoard: r
        });     
    }

    mainLoop = () => {
        this.tick();//??
    }
    

    componentDidMount() {
        this.playButton();
        window.addEventListener('keydown', (e) => {
            e.preventDefault();
        });
        document.addEventListener('keyup', (event) => {
            //console.log(event.code);
            let ec = event.code;
            if (ec === 'Space'){ 
                this.tick();
                this.pauseButton();
            }
            else if(ec === 'KeyW'){
                this.swipeBoard('N');   
            }
            else if(ec === 'KeyS'){
                this.swipeBoard('S');
            }
            else if(ec === 'KeyA'){
                this.swipeBoard('W');
            }
            else if(ec === 'KeyD'){
                this.swipeBoard('E');
            }
          }, false);        
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
                        boxSize = {Math.floor(this.state.boxSize)}
                        minusButton = {this.minusButton}
                        plusButton = {this.plusButton}
                    />
                    <BoardController
                        playButton = {this.playButton}
                        pauseButton = {this.pauseButton}
                        nextTick = {this.tickButton}
                        buyutbuton = {this.buyutbuton}
                        setSymetry = {this.setSymetry}
                    />
                </div>
                <div className="currency1-card">
                    <h4>Total Cells</h4>
                    <h4>{this.state.cells} <span className="smallText">(+{this.lastadded})</span></h4>
                    <span>{this.state.fillLimit} of <span className={a}>{this.state.population} </span>filled</span>
                    <h4>Generation {this.state.generation}</h4>
                    <h4>Board {this.rows*this.cols}</h4>
                </div>
                
            </div>
        )
    }
}

function arrayClone(arr){
    return JSON.parse(JSON.stringify(arr));
}

function createBoard(rows, cols) {
    return Array(rows).fill().map(() => Array(cols).fill(false));
}

function arrayRotate(arr, reverse) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}
  

export default Game;

