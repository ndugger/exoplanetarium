import * as RX from 'rxjs'

import { Action } from './Action';

export class Reactor<Subject extends string = string> {
    
    private subjects: {
        [key: string]: RX.Subject<Action<Subject>>
    }

    protected emit(reaction: Action<Subject>): void {
        this.subjects[reaction.subject].next(reaction);
    }

    public constructor() {
        this.subjects = {};
    }

    public observe(subject: Subject): RX.Subject<Action<Subject>> {
        return this.subjects[subject];
    }
}