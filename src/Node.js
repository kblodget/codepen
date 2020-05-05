import { HotKeys } from 'react-hotkeys';
import React, { Component } from 'react';
import rand from 'lodash.random';

const DEFAULT_NODE_SIZE = 100;
const SIZE_INCREMENT = 5;
const POS_INCREMENT = 5;

class Node extends Component {
    state = {
        pos: [
            rand(0, window.innerWidth - DEFAULT_NODE_SIZE),
            rand(0, window.innerHeight - DEFAULT_NODE_SIZE)
        ],
        size: DEFAULT_NODE_SIZE,
        deleted: false
    };

    move(x = 0, y = 0) {
        this.setState(({ pos }) => ({
            pos: [pos[0] + x * POS_INCREMENT, pos[1] + y * POS_INCREMENT]
        }));
    }

    resize(expansion = 0) {
        this.setState(state => ({
            size: state.size + expansion * SIZE_INCREMENT
        }));
    }

    requestDelete = () => this.setState({ deleted: true });

    render() {
        const handlers = {
            up: this.move.bind(this, 0, -1),
            down: this.move.bind(this, 0, 1),
            left: this.move.bind(this, -1, 0),
            right: this.move.bind(this, 1, 0),
            delete: this.requestDelete,
            expand: this.resize.bind(this, 1),
            contract: this.resize.bind(this, -1)
        };

        const { size, pos, deleted } = this.state;
        const [x, y] = pos;

        const style = {
            width: size,
            height: size,
            left: x,
            top: y,
            opacity: deleted ? 0.2 : 1
        };

        // tabIndex is explicitly set here so we can use the tab key to move between nodes
        // - by default we would set it to -1 so it can only be directly clicked (& tapped?)
        //   or focused programattically
        return (
            <HotKeys
                tabIndex="0"
                handlers={handlers}
                className="node"
                style={style}
            >
                Node
            </HotKeys>
        );
    }
}

export default Node;
