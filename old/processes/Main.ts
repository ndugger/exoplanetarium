import { UserInterface } from 'src/client/components/user_interface';

function main(): void {
    document.getElementById('main').append(new UserInterface());
}

main();