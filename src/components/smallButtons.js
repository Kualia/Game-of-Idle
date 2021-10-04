import React, { Component } from 'react';
import minusIcon from '../visuals/icons/icons-minus.svg';
import plusIcon from '../visuals/icons/icons-plus.svg';


class littleButtons extends Component {
    render() {
        return (
            <div className="smallButtons">
                <div className="smallButton" onClick={this.props.plusButton}>
                    <img draggable="false" src={plusIcon} alt="+"/>
                </div>
                <div className="smallButton" onClick={this.props.minusButton}>
                    <img draggable="false" src={minusIcon} alt="-"/>
                </div>
            </div>
        )
    }
}
export default littleButtons;