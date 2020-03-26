import * as Fusion from 'fusion';
import { UserInterface } from 'this/client/components/user_interface';

/**
 * Create application client.
 */
const client = new Fusion.Client();
const userInterface = new UserInterface();

client.observe('ready').subscribe(action => {
    client.mount(userInterface);
    client.spawn(new Fusion.Thread('/threads/graphics'));
});

client.connect(new Fusion.Socket('http://localhost:6666'));