import * as Cortex from 'cortex';
import { init } from 'this/graphics';

export class Canvas extends Cortex.Component {

    protected handleComponentReady(): void {
        init(this.shadowRoot.querySelector(`.${ HTMLCanvasElement.name }`));
    }

    public render(): Cortex.Element[] {
        return [
            <HTMLCanvasElement height={ window.innerHeight } width={ window.innerWidth }/>
        ];
    }

    public theme(): string {
        return `
            .${ HTMLCanvasElement.name } {
                display: block;
            }
        `;
    }
}