
export class User {
    userId: string;
    userName: string;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    phoneNumberVerified: boolean;

    avatar: string;
    firstName: string;
    lastName: string;
    companies: string;

    constructor() {
        this.userId = '';
        this.userName = '';
        this.email = '';
        this.phoneNumber = '';
        this.emailVerified = false;
        this.phoneNumberVerified = false;

        this.avatar = '';
        this.firstName = '';
        this.lastName = '';
        this.companies = '';
    }

    getUser(param) {
        this.userId = param.attributes.sub;
        this.userName = param.username;
        this.email = param.attributes.email;
        this.phoneNumber = param.attributes.phone_number;
        this.emailVerified = param.attributes.email_verified;
        this.phoneNumberVerified = param.attributes.phone_number_verified;

        this.avatar = '';
        this.firstName = '';
        this.lastName = '';
        this.companies = '';
    }
}