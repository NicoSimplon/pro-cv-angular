export class Profile {

    constructor(public actuelEmail: string, public newEmail: string, public password: string) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            this.password = hash;
        });
    }

}
