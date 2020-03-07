import * as Cortex from 'cortex'
import { theme } from 'this/utilities/Theme'

type Edge = 'bottom' | 'left' | 'right' | 'top';
type EdgeArray = [ Edge?, Edge?, Edge?, Edge? ];

export class Pane extends Cortex.Component {

    public edges?: EdgeArray;

    public render() {
        return [
            <HTMLDivElement>
                <HTMLSlotElement/>
            </HTMLDivElement>
        ];
    }

    public theme() {
        return `
            .${ HTMLDivElement.name } {
                align-items: center;
                backdrop-filter: blur(${ theme.effects.blur }px);
                background-color: rgba(${ theme.palette.common.white }, 0.066);
                box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.066), 0 1em 2em rgba(${ theme.palette.common.black }, 0.5);
                display: flex;
                padding: 1em;
            }
        `;
    }
}