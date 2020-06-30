import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { Auth } from 'aws-amplify';
import { Storage } from '@ionic/storage';
import { ProfileHelper } from 'src/app/helpers/profileHelper';
import { Company } from 'src/app/classes/company';
import { BankCard } from 'src/app/classes/bankcard';

@Component({
  selector: 'app-second',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public View

  public user : User = new User();
  public company : Company = new Company();
  public bankcard : BankCard = new BankCard();
  public user_list : [User];

  private uuid : any;


  constructor(
    private http : HttpClient,
    private storage: Storage,
    private profileHelper: ProfileHelper,
    ) {
    }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  ngOnInit() {
    // load profile
    this.loadProfile();
  }

  getValue(object:string, key: string) {
    this.storage.get(key).then((val) => {
      console.log(object+' get ' + key + ' ', val);
      this.user[key] = val;
      if (key == 'userId'){
        this.sendPostRequestGetYou();
      }
      if (key == 'companies'){
        console.log('getValue companies', JSON.parse(val));
        let companies = JSON.parse(val)
        companies.forEach(company => {
          this.company.companyName = company['company_name'];
          this.company.gstNumber = company['gst_number'];
          this.company.companyAddressStreet = company['company_address_street'];
          this.company.licenseNumber = company['license_number'];
          console.log('this.company', this.company);
        });
      }
      if (key == 'bankcards'){
        console.log('getValue bankcards', JSON.parse(val));
        let bankcards = JSON.parse(val)
        bankcards.forEach(bankcard => {
          this.bankcard.bankName = bankcard['bank_name'];
          this.bankcard.accountNumber = bankcard['account_number_2']+'-'+
                                        bankcard['account_number_4']+'-'+
                                        bankcard['account_number_7']+'-'+
                                        bankcard['account_number_3'];
          this.bankcard.accountName = bankcard['account_name'];
          // this.bankcard.bsb = bankcard['bsb'];
        });
      }
    }).catch((error) => {
      console.log('get error for ' + key + '', error);
    });
  }


  loadProfile(){
    this.getValue('user', 'avatar');
    this.getValue('user', 'email');
    this.getValue('user', 'emailVerified');
    this.getValue('user', 'firstName');
    this.getValue('user', 'lastName');
    this.getValue('user', 'phoneNumber');
    this.getValue('user', 'phoneNumberVerified');
    this.getValue('user', 'userName');
    this.getValue('user', 'companies');
    this.getValue('user', 'bankcards');
    this.getValue('user', 'userId');
  }


  syncProfile(user){
    if (user){
      if (this.user.avatar != user["photo_storage_addr"]){
        this.user.avatar = user["photo_storage_addr"];
      }
      if (this.user.firstName != user["user_first_name"]){
        this.user.firstName = user["user_first_name"];
      }
      if (this.user.lastName != user["user_last_name"]){
        this.user.lastName = user["user_last_name"];
      }
      if (this.user.email != user["user_email"]){
        this.user.email = user["user_email"];
      }
      if (this.user.phoneNumber != user["user_mobile_phone"]){
        this.user.phoneNumber = user["user_mobile_phone"];
      }
    }
  }

  syncCompany(company){
    if (company){
      if (this.company.companyName != company["company_name"]){
        this.company.companyName = company["company_name"];
      }
      if (this.company.gstNumber != company["gst_number"]){
        this.company.gstNumber = company["gst_number"];
      }
      if (this.company.companyAddressStreet != company["company_address_street"]){
        this.company.companyAddressStreet = company["company_address_street"];
      }
      if (this.company.licenseNumber != company["license_number"]){
        this.company.licenseNumber = company["license_number"];
      }
    }
  }

  syncUi(res){
    if (res)
    {
      this.user_list = JSON.parse(res);
      console.log("this.user_list",this.user_list);
      this.syncProfile(this.user_list[0])
    }
  }


  sendPostRequestGetYou() {
    console.log("sendPostRequestGetYou");
    const postBody = {'userId': this.user.userId};
    console.log("postBody", postBody);
    this.http.post("https://lf2zksus3b.execute-api.ap-southeast-2.amazonaws.com/dev/selectYou", postBody, this.httpOptions)
      .subscribe((res: any) => {
        console.log("[READ]",res);
        this.syncUi(res)
    });

  }

  
  sendPostRequestPostYou() {

    const postBody = {
      "userEmail": this.user.email,
      "userMobilePhone": this.user.phoneNumber,
      "userFirstName": this.user.firstName,
      "userLastName": this.user.lastName,
      // "photoStorageAddr": this.user.avatar
    };

    this.http.post("https://rfs07r6gyk.execute-api.ap-southeast-2.amazonaws.com/dev/insertYou", postBody, this.httpOptions)
    .subscribe((res: any) => {
      console.log("[CREATE]", JSON.parse(res));
    });

  }

  updateYou(){
    // update local
    this.profileHelper.saveToLocal(this.user);
    // update cloud
    this.sendPostRequestUpdateYou();
  }

  updateYourCompany(){
    // update local
    this.profileHelper.saveToLocal(this.user);
    // update cloud
    this.sendPostRequestUpdateYou();
  }

  updateYourBankcard(){
    // update local
    this.profileHelper.saveToLocal(this.user);
    // update cloud
    this.sendPostRequestUpdateYou();
  }


  sendPostRequestUpdateYou(){
    console.log('sendPostRequestUpdateYou');
    const postBody = {
      "userEmail": this.user.email,
      "userMobilePhone": this.user.phoneNumber,
      "userFirstName": this.user.firstName,
      "userLastName": this.user.lastName,
      "userId":this.user.userId,
      // "photoStorageAddr": this.user.avatar
    };

    this.http.post("https://ww8iz4maol.execute-api.ap-southeast-2.amazonaws.com/dev/updateYou", postBody, this.httpOptions)
    .subscribe((res: any) => {
      console.log("[UPDATE]",res);
    });


  }


}
