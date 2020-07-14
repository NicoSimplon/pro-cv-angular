export class Authentification {

    public email: string;
    public motDePasse: string;

    constructor() {}

    /**
     * hashPassword
     */
    public hashPassword() {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        bcrypt.hash(this.motDePasse, saltRounds, (err, hash) => {
            this.motDePasse = hash;
        });
    }

}
