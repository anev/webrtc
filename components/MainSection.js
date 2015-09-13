import React, { Component, PropTypes } from 'react';
import ChatItem from './ChatItem';

export default class MainSection extends Component {

    static propTypes = {
        chats: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { chats, actions } = this.props;
        return (
            <section className='main'>
                <ul className='todo-list'>
                    {chats.history.map(msg =>
                            <ChatItem msg={msg} me={chats.author} {...actions} />
                    )}
                </ul>
            </section>
        );
    }
}
