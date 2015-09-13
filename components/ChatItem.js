import React, { Component, PropTypes } from 'react';

export default class ChatItem extends Component {
    static propTypes = {
        msg: PropTypes.object.isRequired,
        me: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        const {msg, me, toogleHeart} = this.props;
        const mentioned = msg.text.indexOf('@' + me.nick) > -1;
        const className = mentioned ? 'viewMentioned' : 'view';

        const heartsCount = msg.hearts != null ? msg.hearts.length : 0;
        const iLoveIt = msg.hearts != null ? msg.hearts.indexOf(me.id) > -1 : false;
        const heart = '\u2764';

        let element = (
            <div className={className}>
                <label>
                    {msg.author.nick}> {msg.text}
                </label>

                <label hide onClick={() => toogleHeart(msg.id)} className='heart-num'>
                    {heartsCount}
                </label>
                <label onClick={() => toogleHeart(msg.id)} className={iLoveIt?'heart-my':'heart'}>
                    {heart}
                </label>
            </div>
        );
        return (
            <li>
                {element}
            </li>
        );
    }
}
