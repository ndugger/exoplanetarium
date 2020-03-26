import { Reactor } from './Reactor'
import { Thread } from './Thread';

export class System extends Reactor {
    
    private threads: Thread[] = [];

    public spawn(thread: Thread) {
        this.threads.push(thread);
    }
}