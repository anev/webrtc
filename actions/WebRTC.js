import { GOT_MESSAGE, SEND_MESSAGE, SEND_HISTORY } from '../constants/ActionTypes';
import Peer from 'peerjs'

const DEFAULT_CONFIG = {
    host: '46.101.152.230', port: 9000, lookupPort: 9001, path: 'mypeers', debug: 2
};

export default function WebRTC(id, messageProcessor, config = DEFAULT_CONFIG) {

    var THE = this;

    this.init = function () {
        this.id = id;
        this.peers = {}; // "id":{conn:connection, metadata}
        this.peer = new Peer(this.id, config);
        this.peer.on('connection', this.onIncomingConnection);
        this.peer.on('error', this.errConn);
        this.connToNeibs();
    };

    this.connToNeibs = function () {
        this.removeMyId(this.discover()).map(function (neib) {
            var conn = THE.peer.connect(neib, {metadata: {peerId: THE.id}});
            conn.on('open', function () {
                THE.peers[neib] = conn;
            });
            conn.on('data', THE.processData);
        });
    };

    this.removeMyId = function (arr) {
        var idx = arr.indexOf(this.id);
        if (idx !== -1) {
            arr.splice(idx, 1);
        }
        return arr;
    };

    this.discover = function () {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://' + config.host + ':' + config.lookupPort + '/lookup', false);
        xmlHttp.send(null);
        return JSON.parse(xmlHttp.responseText);
    };

    this.onIncomingConnection = function (conn) {
        console.debug('there is newcomer', conn);
        THE.peers[conn.metadata.peerId] = conn;
        conn.on('data', THE.processData);
        conn.on('open', function () {
            console.info('connection to', conn.metadata.peerId, 'opened');
            messageProcessor({type: SEND_HISTORY, newcomer: conn.metadata.peerId});
        });
        conn.on('close', function () {
            console.info('connection to', conn.metadata.peerId, 'closed');
            delete THE.peers[conn.metadata.peerId];
        });
        conn.on('error', function (err) {
            console.error('connection to', conn.metadata.peerId, 'error', err);
            delete THE.peers[conn.metadata.peerId];
        });

    };

    this.who = function(){
        this.peers
    };

    this.processData = function (data) {
        var json = JSON.parse(data);
        messageProcessor(json);
    };

    this.sayLoudly = function (msg) {
        console.log('>', msg);
        for (var p in this.peers) {
            this.peers[p].send(JSON.stringify(msg));
        }
    };

    this.say = function (msg, to) {
        console.log('<', msg, 'to', to);
        this.peers[to].send(JSON.stringify(msg));
    };

    this.errConn = function (err) {
        console.error('err', err);
    }
};