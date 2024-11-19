export class User {
    constructor(
        public id: string | null,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string
    ) {
    }
}