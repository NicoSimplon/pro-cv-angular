
export class Adress {

    public id: number;

    constructor(
        public streetNumber: number,
        public street: string,
        public appartment: string,
        public postalCode: number,
        public town: string,
    ) {}

}

