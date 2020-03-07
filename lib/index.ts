interface ReactorOptions {
    graphics?: Worker;
    network?: Worker;
    physics?: Worker;
}

export class Reactor extends EventTarget {

    public constructor(canvas: HTMLCanvasElement, options: ReactorOptions) {
        super();
        const offscreen = canvas.transferControlToOffscreen();
        options.graphics.postMessage({ type: 'init', canvas: offscreen }, [ offscreen as unknown as Transferable ]);
        this.dispatchEvent(new Event('ready'));
    }
}