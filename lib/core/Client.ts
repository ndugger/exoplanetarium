import { Socket } from './Socket';
import { System } from './System';

export class Client extends System {

    private connection: Socket;

    public constructor() {
        super();

        this.connection.addEventListener('open', () => {
            this.dispatchEvent(new Event('ready'));
        });
    }

    public connect(socket: Socket): void {
        this.connection = socket;
    }

    public mount(element: Element): void {

    }
}