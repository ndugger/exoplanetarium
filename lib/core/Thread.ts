import * as WorkerThreads from 'worker_threads';

import { Action } from './Action';
import { Reactor } from './Reactor';

enum ThreadEventTypes {
    Error = 'error',
    Message = 'message'
}

/**
 * Abstracts browser or node workers.
 */
export class Thread extends Reactor {
    
    private worker: Worker | WorkerThreads.Worker;

    public constructor(src: string) {
        super();

        if (typeof Worker !== 'undefined') {
            this.worker = new Worker(src);
            this.worker.addEventListener(ThreadEventTypes.Message, event => {
                this.emit(new Action(event.data));
            });
        }
        else {
            this.worker = new WorkerThreads.Worker(src);
            this.worker.on(ThreadEventTypes.Message, data => {
                this.emit(new Action(data));
            });
        }
    }

    public terminate(): void {
        this.worker.terminate();
    }
}