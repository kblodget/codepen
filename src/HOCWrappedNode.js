import { withHotKeys } from 'react-hotkeys';
import React, { Component } from 'react';

const COLORS = ['green', 'purple', 'orange', 'grey', 'pink'];

const ACTION_KEY_MAP = {
    changeColor: 'alt+c'
};

class HOCWrappedNode extends Component {
    state = { colorNumber: 0 };
    changeColor = () => {
        this.setState(({ colorNumber }) => ({
            colorNumber: colorNumber === COLORS.length - 1 ? 0 : colorNumber + 1
        }));
    };
    hotKeyHandlers = { changeColor: this.changeColor };

    render() {
        const { colorNumber } = this.state;
        const style = {
            width: 200,
            height: 60,
            left: 20,
            top: 20,
            opacity: 1,
            background: COLORS[colorNumber]
        };

        // tabIndex is explicitly set here so we can use the tab key to move between nodes
        // - by default we would set it to -1 so it can only be directly clicked (& tapped?)
        //   or focused programattically
        return (
            <div tabIndex="0" className="node" style={style}>
                [Alt+C] Change Color
            </div>
        );
    }
}

export default withHotKeys(ACTION_KEY_MAP)(HOCWrappedNode);
