import * as types from '../constants/ActionTypes';
import * as utils from '../utils/utils';

export function historyMsg(history) {
    return {
        type: types.HISTORY,
        history: history.filter(utils.isPublic)
    }
};

export function whoAnswerMsg(author) {
    return {
        type: types.IAM_ALIVE,
        author: author,
        text: 'I am alive!',
        public: false
    }
};

export function whoAliveHere(id, author) {
    return {
        id: id,
        author: author,
        type: types.WHO,
        public: true
    };
}

const helpText = "Just type message and press enter to send message to averyone\n\n" +
    "The chat supports several commands:\n" +
    "  /who - see who's online\n" +
    "  /name <newname> - change name\n" +
    "  @<nick> - mention someone, the mention will be highlighted in the person's chat\n" +
    "  /help - this help";

export function helpMessage() {
    return {
        id: "help",
        author: serviceAuthor,
        type: types.SERVICE,
        text: helpText,
        public: false
    };
}

export function changeNameMsg(newNick, id = utils.uuid()) {
    return {
        text: 'my name is ' + newNick,
        author: serviceAuthor,
        type: types.CHANGE_NAME,
        newNick: newNick,
        public: false,
        id: id
    };
};

export function pubMsg(id, text, author) {
    return {
        id: id,
        text: text,
        author: author,
        type: types.SEND_MESSAGE,
        public: true
    }
};

export function hint(hint) {
    return {
        type: types.HINT,
        hint: hint
    }
};

export function whosAliveSelf(id) {
    return {
        id: id,
        text: "who's alive?",
        author: serviceAuthor,
        type: types.SEND_MESSAGE,
        public: false
    };
};

export function toogleHeartMsg(msgId, author) {
    return {
        id: utils.uuid(),
        msgId: msgId,
        author: author,
        type: types.TOOGLE_HEART,
        public: false
    };
};

export function myIdMsg(author) {
    return {type: types.MY_ID, id: author.id, nick: author.nick}
}

const serviceAuthor = {
    nick: '[service]'
}