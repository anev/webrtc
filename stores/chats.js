import * as types from '../constants/ActionTypes';
import * as utils from '../utils/utils';

const INIT_STATE = {
    hint: 'type "/help" to get description',
    history: [],
    author: {
        id: "anonim",
        nick: "anonim"
    }
};

const MAX_HISTORY = 100;

/**
 * The main (pure) function which changes application state. (state, action) => (newstate)
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function chats(state = INIT_STATE, action) {

    // todo i use same constants and objects for transport and for state changes.
    // it's ok 'cause there are no lots of such constants,
    // but if it will be much more, good decision will be to split them up.
    switch (action.type) {

        // like/dislike a message
        case types.TOOGLE_HEART:
            return {
                hint: state.hint,
                author: state.author,
                history: toogleHeart(action.msgId, action.author, state.history)
            };

        // initial message
        case types.MY_ID:
            return {
                hint: state.hint,
                author: {id: action.id, nick: action.nick},
                history: state.history
            };

        case types.HINT:
            return {
                hint: action.hint != '' ? action.hint : INIT_STATE.hint,
                author: state.author,
                history: state.history
            };

        // somebody says he's alive
        case types.IAM_ALIVE:
            return {
                hint: state.hint,
                author: state.author,
                history: [action, ...state.history]
            };

        // change my name
        case types.CHANGE_NAME:
            return {
                hint: state.hint,
                author: {id: state.author.id, nick: action.newNick},
                history: [action, ...state.history]
            };

        // got history, mege it with current
        case types.HISTORY:
            console.log(utils.mergeUniqueMessages(action.history, state.history, MAX_HISTORY));
            return {
                hint: state.hint,
                author: state.author,
                history: utils.mergeUniqueMessages(action.history, state.history, MAX_HISTORY)
            };

        // got message
        case types.GOT_MESSAGE:
            return {
                hint: state.hint,
                author: state.author,
                history: [action, ...state.history]
            };

        // this is my own message, we should save it to history too.
        case types.SEND_MESSAGE:
            return {
                hint: state.hint,
                author: state.author,
                history: [action, ...state.history],
            };

        case types.SERVICE:
            return {
                hint: state.hint,
                author: state.author,
                history: [action, ...state.history],
            };

        // service message from redux
        case "@@INIT":
            return INIT_STATE;

        default:
            console.error('Unknown action', action);
            return state;
    }
}

function updateState(state, author = null, history = null, hint = null) {
    return {
        author: author == null ? state.author : author,
        hint: hint == null ? state.hint : hint,
        history: history == null ? state.history : history
    };
}

function toogleHeart(msgId, author, history) {

    for (var i in history) {
        const item = history[i];
        if (item.id != msgId) {
            continue;
        }

        // the first heart, add it
        if (item.hearts == null) {
            item.hearts = [];
            item.hearts.push(author.id);
            return history;
        }

        const index = item.hearts.indexOf(author.id);
        // there is a heart from this person, remove it
        if (index > -1) {
            item.hearts = item.hearts.filter(function (i) {
                return i != author.id;
            });
        } else {
            // there is no heart grom the person, add one.
            history[i].hearts.push(author.id);
        }

        return history;
    }
}
