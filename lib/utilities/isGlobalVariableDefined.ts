export function isGlobalVariableDefined(variable: unknown): boolean {
    return typeof variable !== 'undefined';
}