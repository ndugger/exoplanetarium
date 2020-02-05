import * as Cortex from 'cortex';
import { Canvas } from 'this/components/Canvas'

export class Root extends Cortex.Component {

    public render(): Cortex.Element[] {
        return [
           <Canvas/>
        ];
    }
}
