/**
 * Represents the current runtime environment. 
 * Useful for forking logic when different environemnts require different objects for compatibility.
 */
export enum RuntimeEnv {
    Browser,
    Node,
    Worker
}