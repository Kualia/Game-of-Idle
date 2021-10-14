import React, { Component } from 'react';
import playIcon from '../visuals/icons/icons-play.svg';

import tickIcon from '../visuals/icons/icons-skip-forward.svg';
import gridIcon from '../visuals/icons/icons-grid.svg'



class BoardController extends Component {
    constructor(props){
        super(props);
        this.state = {
        xSymetry: false,
        ySymetry: false
        };

        //this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
            this.props.setSymetry(this.state.xSymetry, this.state.ySymetry);
        });
        

    }
  
    render() {
        return (
            <div className="controllerButtons">
                <div className="bigButton" onClick={this.props.playButton}>
                    <img draggable="false" src={playIcon} alt="play"/>
                </div>
                <div className="bigButton" onClick={this.props.nextTick}>
                    <img draggable="false" src={tickIcon} alt="tick"/>
                </div>
                <div className="bigButton" onClick={this.props.buyutbuton}>
                    <img draggable="false" src={gridIcon} alt="grid"/>
                </div>
                <div className="checkboxs">
                    <div className="checkbox-container">
                        <input className="symetryCheckbox" id="xSymetry" name="xSymetry" type="checkbox" checked={this.state.xSymetry} onChange={this.handleInputChange}></input>
                        <label htmlFor="xSymetry">X</label>
                        </div>
                    <div className="checkbox-container">
                        <input className="symetryCheckbox" id="ySymetry" name="ySymetry" type="checkbox" checked={this.state.ySymetry} onChange={this.handleInputChange}></input>
                        <label htmlFor="ySymetry">Y</label>
                    </div>
                </div>
            </div>
        )
    }
}



export default BoardController;