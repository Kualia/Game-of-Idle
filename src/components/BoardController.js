import React, { Component } from 'react';
import playIcon from '../visuals/icons/icons-play.svg';

import tickIcon from '../visuals/icons/icons-skip-forward.svg';
import gridIcon from '../visuals/icons/icons-grid.svg'



class BoardController extends Component {
    render() {
        return (
            <div className="controllerButtons" >
                <div className="bigButton" onClick={this.props.playButton}>
                    <img draggable="false" src={playIcon} alt="play"/>
                </div>
                <div className="bigButton" onClick={this.props.nextTick}>
                    <img draggable="false" src={tickIcon} alt="tick"/>
                </div>
                <div className="bigButton" onClick={this.props.buyutbuton}>
                    <img draggable="false" src={gridIcon} alt="grid"/>
                </div>
            </div>
        )
    }
}

export default BoardController;