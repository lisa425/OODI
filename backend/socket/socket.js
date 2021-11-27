import { Server } from 'socket.io';

class Socket {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: '*',
            },
        });

        this.io.on('connection', (socket) => {
            console.log('Socket client connected');
        });
    }
}


let socketIO
export function initSocket(server) {
    //console.log(!socketIO)
    if (!socketIO) {
        socketIO = new Socket(server)
    }
}

export function getSocket() {
    if (!socketIO) {
        throw new Error('Please call init first');
    }
    return socketIO.io;
}
