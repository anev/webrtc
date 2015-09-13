import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ChatTextHint extends Component {
    static propTypes = {
        hint: PropTypes.string
    };

    render() {
        const {hint} = this.props;
        return (
            <div className='hint'>{hint}</div>
        );
    }
}
