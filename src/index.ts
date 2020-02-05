import { Root } from './components/Root'

export function main(id: string): void {
    document.getElementById(id).append(new Root());
}