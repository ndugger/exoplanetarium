import * as NodeWebSocket from 'ws';

import { Action } from './Action';
import { Reactor } from './Reactor';

enum SocketEventType {
    Error = 'error',
    Message = 'message'
}

/**
 * Abstracts browser or ws sockets.
 */
export class Socket extends Reactor {

    private connection: WebSocket | NodeWebSocket;

    public constructor(address?: string) {
        super();
        
        if ('WebSocket' in globalThis) {
            this.connection = new WebSocket(address);

            this.connection.addEventListener(SocketEventType.Message, event => {
                this.emit(new Action(JSON.parse(event.data)));
            });
        }
        else {
            this.connection = new NodeWebSocket(address);

            this.connection.on(SocketEventType.Message, data => {
                this.emit(new Action(JSON.parse(data as string)));
            })
        }
    }

    public close(): void {
        this.connection.close();
    }
}