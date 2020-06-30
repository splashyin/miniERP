export class Company {
    companyId: any;
    companyName: string;
    gstNumber: string;
    licenseNumber: string;
    companyAddressStreet: string;
    companyAddressSuburb: string;
    companyAddressState: string;
    companyPostcode: string;
    logoStorageAddr: string;
    userId: string;

    constructor() {
        this.companyId = '';
        this.companyName = '';
        this.gstNumber = '';
        this.licenseNumber = '';
        this.companyAddressStreet = '';
        this.companyAddressSuburb = '';
        this.companyAddressState = '';
        this.companyPostcode = '';
        this.logoStorageAddr = '';
        this.userId = '';
    }

    setCompanyId(companyId){
        this.companyId = companyId;
    }
    setCompanyName(companyName){
        this.companyName = companyName;
    }
    setGSTNumber(gstNumber){
        this.gstNumber = gstNumber;
    }
    setLicenseNumber(licenseNumber){
        this.licenseNumber = licenseNumber;
    }
    setCompanyAddressStreet(companyAddressStreet){
        this.companyAddressStreet = companyAddressStreet;
    }
    setCompanyAddressSuburb(companyAddressSuburb){
        this.companyAddressSuburb = companyAddressSuburb;
    }
    setCompanyAddressState(companyAddressState){
        this.companyAddressState = companyAddressState;
    }
    setCompanyPostcode(companyPostcode){
        this.companyPostcode = companyPostcode;
    }
    setLogoStorageAddr(logoStorageAddr){
        this.logoStorageAddr = logoStorageAddr;
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
