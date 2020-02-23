import * as Cortex from 'cortex';
import { init } from 'this/graphics';

export class Main extends Cortex.Component {

    private workers = {
        update: new Worker('update.js')
    };

    protected handleComponentReady(): void {
        init(this.shadowRoot.querySelector(`.${ HTMLCanvasElement.name }`));
    }

    protected handleCursorMove() {
        console.log('move');
    }

    public render(): Cortex.Element[] {
        return [
            <HTMLCanvasElement height={ window.innerHeight - 64 } width={ window.innerWidth }/>,
            <HTMLElement tag='main'>
                <HTMLElement tag='header'>
                    <HTMLDivElement id='icon'/>
                    <HTMLSpanElement id='logo'>
                        Planetarium
                    </HTMLSpanElement>
                </HTMLElement>
                <HTMLElement tag='nav'/>
            </HTMLElement>
        ];
    }

    public theme(): string {
        return `
            :host {
                display: contents;
            }

            .${ HTMLCanvasElement.name } {
                display: block;
                left: 0;
                position: absolute;
                top: 64px;
                z-index: 0;
            }
            
            main.${ HTMLElement.name } {
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                font-family: 'Montserrat', sans-serif;
                position: relative;
                z-index: 1;
            }

            header.${ HTMLElement.name } {
                align-items: center;
                background-color: black;
                display: flex;
                height: 64px;
                padding: 0 16px;
            }

            #logo {
                color: white;
                font-size: 1.33rem;
                font-weight: lighter;
                margin-left: -1.2rem;
            }

            #icon {
                border: 1px solid rgb(4, 224, 96);
                border-radius: 100%;
                border-right: none;
                filter: drop-shadow(0 0 8px rgb(4, 224, 96));
                height: 32px;
                width: 32px;
            }

            nav.${ HTMLElement.name } {
                backdrop-filter: blur(8px);
                background-color: rgba(255, 255, 255, 0.05);
                box-shadow: inset 0 -1px rgba(255, 255, 255, 0.05), 0 16px 32px rgba(0, 0, 0, 0.5);
                height: 48px;
            }
        `;
    }
}
