import * as Fusion from 'fusion';

/**
 * Create application server.
 */
const server = new Fusion.Server();

server.observe('ready').subscribe(action => {
    
});

server.listen(6666);