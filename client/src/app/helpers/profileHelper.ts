
import { Storage } from '@ionic/storage';
import { User } from 'src/app/classes/user';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileHelper{
  list: any;

  constructor(
      private storage: Storage,
    ) {
    }

  saveToLocal(user){
      this.storage.set('avatar', user.avatar);
      this.storage.set('email', user.email);
      this.storage.set('emailVerified', user.emailVerified);
      this.storage.set('firstName', user.firstName);
      this.storage.set('lastName', user.lastName);
      this.storage.set('phoneNumber', user.phoneNumber);
      this.storage.set('phoneNumberVerified', user.phoneNumberVerified);
      this.storage.set('userId', user.userId);
      this.storage.set('userName', user.userName);
  }

  // saveToLocalCompany(company, company_id){
  //   // console.log("company, company_id",company,company_id);
  //   this.storage.set('company_id_'+company_id.toString(), company.company_id);
  //   this.storage.set('company_name_'+company_id.toString(), company.company_name);
  //   this.storage.set('gst_number_'+company_id.toString(), company.gst_number);
  //   this.storage.set('license_number_'+company_id.toString(), company.license_number);
  //   this.storage.set('company_address_street_'+company_id.toString(), company.company_address_street);
  //   this.storage.set('company_address_suburb_'+company_id.toString(), company.company_address_suburb);
  //   this.storage.set('company_address_state_'+company_id.toString(), company.company_address_state);
  //   this.storage.set('company_postcode_'+company_id.toString(), company.userId);
  //   this.storage.set('logo_storage_addr_'+company_id.toString(), company.userName);
  //   this.storage.set('user_id_'+company_id.toString(), company.userName);
  // }

  saveToLocalCompanies(companies){
    this.storage.set('companies', companies);
  }

  saveToLocalBankCard(bankcards){
    this.storage.set('bankcards', bankcards);
  }

}