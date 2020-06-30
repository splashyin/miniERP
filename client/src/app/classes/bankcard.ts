export class BankCard {
    bankCardId: any;
    bankName: string;
    accountName: string;
    accountNumber2: string;
    accountNumber3: string;
    accountNumber4: string;
    accountNumber7: string;
    accountNumber:string;

    userId: string;

    constructor() {
        this.bankCardId = '';
        this.bankName = '';
        this.accountName = '';
        this.accountNumber2 = '';
        this.accountNumber3 = '';
        this.accountNumber4 = '';
        this.accountNumber7 = '';
        this.accountNumber = '';
        this.userId = '';
    }

    setBankCardId(bankCardId){
        this.bankCardId = bankCardId;
    }
    setBankName(bankName){
        this.bankName = bankName;
    }
    setAccountName(accountName){
        this.accountName = accountName;
    }
    setAccountNumber2(accountNumber2){
        this.accountNumber2 = accountNumber2;
    }
    setAccountNumber3(accountNumber3){
        this.accountNumber3 = accountNumber3;
    }
    setAccountNumber4(accountNumber4){
        this.accountNumber4 = accountNumber4;
    }
    setAccountNumber7(accountNumber7){
        this.accountNumber7 = accountNumber7;
    }
    getAccountNummber(){
        return this.accountNumber2+'-'+this.accountNumber4+'-'+this.accountNumber7+'-'+this.accountNumber3
    }
    
    setUserId(userId){
        this.userId = userId;
    }


    // getUser(param) {
    //     this.company_id = param.company;
    //     this.userName = param.username;
    //     this.email = param.attributes.email;
    //     this.phoneNumber = param.attributes.phone_number;
    //     this.emailVerified = param.attributes.email_verified;
    //     this.phoneNumberVerified = param.attributes.phone_number_verified;

    //     this.avatar = '';
    //     this.firstName = '';
    //     this.lastName = '';
    // }


}
