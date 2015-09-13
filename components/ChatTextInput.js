import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ChatTextInput extends Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        onPress: PropTypes.func.isRequired,
        text: PropTypes.string,
        placeholder: PropTypes.string,
        newItem: PropTypes.bool
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            text: this.props.text || ''
        };
    }

    handleSubmit(e) {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.props.onSave(text);
            if (this.props.newItem) {
                this.setState({text: ''});
            }
        }
    }

    handleChange(e) {
        const text = e.target.value.trim();
        this.props.onPress(text);
        this.setState({text: e.target.value});
    }

    handleBlur(e) {
        if (!this.props.newItem) {
            this.props.onSave(e.target.value);
        }
    }

    render() {
        return (
            <input className={classnames({'new-todo': this.props.newItem})}
                   type='text'
                   placeholder={this.props.placeholder}
                   autoFocus='true'
                   value={this.state.text}
                   onBlur={::this.handleBlur}
                   onChange={::this.handleChange}
                   onKeyDown={::this.handleSubmit}/>
        );
    }
}
