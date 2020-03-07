import * as Cortex from 'cortex';
import * as Fusion from 'fusion';

export class Root extends Cortex.Component {

    private reactor: Fusion.Reactor;

    protected handleComponentReady(): void {
        this.reactor = new Fusion.Reactor(this.shadowRoot.querySelector(`.${ HTMLCanvasElement.name }`), {
            graphics: new Worker('/workers/graphics.js')
        });

        this.reactor.addEventListener('change', () => {
            this.update();
        });

        this.update();
    }

    public render(): Cortex.Element[] {
        return [
            <HTMLCanvasElement height={ window.innerHeight } width={ window.innerWidth }/>,
            <HTMLElement tag='main'>
                <HTMLElement tag='header'>
                    <HTMLDivElement id='icon'/>
                    <HTMLSpanElement id='logo'>
                        Planetarium
                    </HTMLSpanElement>
                </HTMLElement>
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
                top: 0;
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
                display: flex;
                padding: 1.5em 1.25em;
            }

            #logo {
                color: white;
                font-size: 1.33em;
                font-weight: lighter;
                margin-left: -1.1em;
                position: relative;
            }

            #business {
                bottom: -1em;
                color: rgb(4, 224, 96);
                text-transform: lowercase;
                filter: drop-shadow(0 0 0.5em rgb(4, 224, 96));
                font-size: 0.6em;
                position: absolute;
                right: 0;
            }

            #icon {
                border: 1px solid rgb(4, 224, 96);
                border-radius: 100%;
                border-right-color: transparent;
                filter: drop-shadow(0 0 0.5em rgb(4, 224, 96));
                height: 2.5em;
                width: 2.5em;
            }
        `;
    }
}
