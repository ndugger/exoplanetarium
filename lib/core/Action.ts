export class Action<Subject extends string = string> {

    public readonly subject: Subject;

    public constructor(data: object) {
        
    }
}