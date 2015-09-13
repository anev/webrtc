/**
 * Main actions module.
 * Define actions which dispatch events to store.
 */
import * as types from '../constants/ActionTypes';
import WebRTC from './WebRTC';
import * as utils from '../utils/utils';
import * as msgs from './Messages'

var transport;

/**
 * Starts transport, get history, define callback to handle inbound messages.
 * If you want to switch transport layer this is the right place to.
 *
 * @returns {Function}
 */
export function connect(author) {
    return (dispatch, getState) => {
        transport = new WebRTC(author.id, messageCallback(dispatch, getState));
        dispatch(
            msgs.myIdMsg(author)
        );
        transport.init();
        console.log("hi, i'm", author);
    };
}

/**
 * Form, send and push new text message to the store,
 *
 * @param text текст
 * @returns {{type, text, author, id}|*} сообщение, готовое для отправки по транспорту
 */
export function sendMessage(text) {
    return (dispatch, getState) => {
        const { author } = getState().chats;

        if (text.startsWith('/')) {
            parseCommands(text, dispatch, getState);
            dispatch(msgs.hint(''));
            return;
        }

        // send the message to each neib
        const msg = msgs.pubMsg(utils.uuid(), text, author);
        transport.sayLoudly(msg);

        // and push it to dispatcher
        dispatch(msg);
    }
}

/**
 * Process key press. Form hint and so on.
 *
 * @param text
 * @returns {Function}
 */
export function pressKey(text) {
    return (dispatch, getState) => {

        var matches = hintCommandRE.exec(text);
        if (matches != null) {
            const fitCmds = commands.filter(function (cmd) {
                return cmd.startsWith(text);
            });

            if (fitCmds.length > 0) {
                dispatch(msgs.hint("avialable commands: " + fitCmds.join(', ')));
            } else {
                dispatch(msgs.hint("there is no such command..."));
            }
        } else {
            dispatch(msgs.hint(""));
        }
    }
}

export function toogleHeart(msgId) {
    return (dispatch, getState) => {
        const { author } = getState().chats;
        const toogleHeart = msgs.toogleHeartMsg(msgId, author);
        transport.sayLoudly(toogleHeart)
        dispatch(toogleHeart);
    }
}

// callback invokes to handle new message from neib
var messageCallback = function (dispatch, getState) {
    return function (data) {

        console.debug('<', data);
        switch (data.type) {

            case types.SEND_HISTORY:
                transport.say(
                    msgs.historyMsg(getState().chats.history),
                    data.newcomer
                );
                break;

            case types.WHO:
                transport.say(
                    msgs.whoAnswerMsg(getState().chats.author),
                    data.author.id
                );
                break;

            default:
                dispatch(data);
        }
    }
};

// todo put all commands to separate module
function parseCommands(text, dispatch, getState) {
    const { author } = getState().chats;

    var matches = nameRE.exec(text);
    if (matches != null) {
        const id = utils.uuid();
        const text = 'my new name is ' + matches[1];

        const publicMsg = msgs.pubMsg(id, text, author);
        const selfMsg = msgs.changeNameMsg(matches[1], id);

        transport.sayLoudly(publicMsg);
        dispatch(selfMsg);

        // save name to local storage
        localStorage.setItem('nick', matches[1]);
        return;
    }

    var matches = whoRE.exec(text);
    if (matches != null) {
        const id = utils.uuid();

        transport.sayLoudly(msgs.whoAliveHere(id, author));

        dispatch(msgs.whosAliveSelf(id));
        return;
    }

    var matches = helpRE.exec(text);
    if (matches != null) {
        dispatch(msgs.helpMessage());
        return;
    }
}

const nameRE = /^\/name\s(\w+)/;
const whoRE = /^\/who/;
const mentionRE = /@(\w+)/;
const helpRE = /^\/help/;
const hintCommandRE = /^\/(\w*)$/;
const commands = ['/who', '/name', '/help'];
