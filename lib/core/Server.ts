import * as NodeWebSocket from 'ws';
import * as Pathfinder from 'pathfinder';

import { Socket } from './Socket';
import { System } from './System';

export class Server extends System {

    private host: NodeWebSocket.Server;
    private router: Pathfinder.Router;
    private sockets: Socket[];

    public listen(port: number): void {
        this.host = new NodeWebSocket.Server({ port });
        this.router = new Pathfinder.Router();
    }
}