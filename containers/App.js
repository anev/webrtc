import { GOT_MESSAGE, SEND_MESSAGE } from '../constants/ActionTypes';
import React, { Component } from 'react';
import ChatApp from './ChatApp';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as stores from '../stores';
import * as ChatActions from '../actions/ChatActions';
import { bindActionCreators } from 'redux';

// тут инициализируем redux,
const redux = createRedux(stores);

// биндим диспетчер на actions
const actions = bindActionCreators(ChatActions, redux.dispatch);

// Ну и проталкиваем действие в store дерез диспетчер
actions.connect(fetchAuthor());

// Компонент верхнего уровня,
export default class App extends Component {

    render() {
        // Provider - прокладка, которая хранит экземпляр redux для своих детей.
        // ставим наше ChatApp
        return (
            <Provider redux={redux}>
                {() => <ChatApp />}
            </Provider>
        );
    }
}

function fetchAuthor() {
    //var id = localStorage.getItem('id');
    //if (id == null) {
        var id = uuid();
        //localStorage.setItem('id', id);
    //}

    var nick = localStorage.getItem('nick');
    if (nick == null) {
        nick = id.substring(0, 4);
    }
    return {id: id, nick: nick}
}

function uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}