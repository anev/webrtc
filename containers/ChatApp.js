import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'redux/react';
import InputArea from '../components/InputArea';
import MainSection from '../components/MainSection';
import * as ChatActions from '../actions/ChatActions';

export default class ChatApp extends Component {
    render() {
        return (
            <Connector select={state => ({ chats: state.chats })}>
                {this.renderChild}
            </Connector>
        );
    }

    renderChild({ chats, dispatch }) {
        const actions = bindActionCreators(ChatActions, dispatch);
        return (
            <div>
                <InputArea hint={chats.hint} pressKey={actions.pressKey} sendMessage={actions.sendMessage}/>
                <MainSection chats={chats} actions={actions}/>
            </div>
        );
    }
}
