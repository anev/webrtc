import React, { PropTypes, Component } from 'react';
import ChatTextInput from './ChatTextInput';
import ChatTextHint from './ChatTextHint';

export default class InputArea extends Component {

    static propTypes = {
        hint: PropTypes.string,
        sendMessage: PropTypes.func.isRequired,
        pressKey: PropTypes.func.isRequired
    };

    handleSave(text) {
        if (text.length !== 0) {
            this.props.sendMessage(text);
        }
    }

    handlePress(text) {
        if (text.length !== 0) {
            this.props.pressKey(text);
        }
    }

    render() {
        const { hint } = this.props;
        return (
            <div>
                <ChatTextHint hint={hint}/>
                <header className='header'>
                    <ChatTextInput newItem={true}
                                   onSave={::this.handleSave}
                                   onPress={::this.handlePress}
                                   placeholder='say something'/>
                </header>
            </div>
        );
    }
}
