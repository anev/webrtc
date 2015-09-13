# Description

RebRTC based peer-to-peer chat implemented with react.js and flux architecture.

 * [Redux](https://github.com/rackt/redux/tree/v0.12.0) is used as flux implementation.
 * [Peer.js](http://peerjs.com/) is used to webrtc communications.
 * As a signal server I use peer.js + express server, it is deployed on 46.101.152.230.
 * Signal server is used for the firts-time chatmates search only. All other communications are peer-to-peer.
  
## Features
 
 * Each participant stores chat history and send it to newcomer.
 * Management is command based, a command format is `/<command> param`.
 * `/name john` command will set your name, the name is stored in local storage.
 * `/who` command asks who's online now.
 * `/help` prints help message.
 * Also mentions are implemented, you can mention john with `@john` substring, the message will be highlighted in john's UI. 
 * Feel free to like any messages.

## Installation

First of all, you can access it on http://46.101.152.230:3000/

To deploy it please procced several steps

0. `nodejs 0.12` has to be installed on target system.

1. install it
```
git clone git@github.com:anev/webrtc.git
cd webrtc
npm install
```
2. Run chat server `node server.js`

3. Run signaling server `node discover.js`

Also you can use docker to run the app (a `Dockerfile` provided)

 * `docker build -t chatapp .`
 * `docker run -p 3000:3000 chatapp`
