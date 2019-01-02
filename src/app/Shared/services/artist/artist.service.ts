import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(public DataService:DataService) { }
  public markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      // if (control.controls) {
      //     control.controls.forEach(c => this.markFormGroupTouched(c));
      // }
    });
  }
  public validationMessages() {
    const messages = {
      required: 'This field is required',
      email: 'This email address is invalid',
    
      invalid_characters: (matches: any[]) => {

        let matchedCharacters = matches;

        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let string = characterString;
          string += character;

          if (matchedCharacters.length !== index + 1) {
            string += ', ';
          }

          return string;
        }, '');

        return `These characters are not allowed: ${matchedCharacters}`;
      },
    };

    return messages;
  }
  public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
    const form = formToValidate;

    for (const field in formErrors) {
      if (field) {
        formErrors[field] = '';
        const control = form.get(field);
        const messages = this.validationMessages();
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              if (key && key !== 'invalid_characters') {
                formErrors[field] = formErrors[field] || messages[key];
              } else {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }
            }
          }
        }
      }
    }

    return formErrors;
  }
  getBuyerData(url,user_id){
    var user_data={"user_id":user_id};
     return this.DataService.getAll(url,user_data);
    
  }
  getCountryData(country_url){
    return this.DataService.getAll(country_url,null,null,'GET');
  }
  getStateData(state_url,countryId){
    countryId={'country_id':countryId};
    return this.DataService.getAll(state_url,countryId);
  }
  getCityData(city_url,stateId){
    stateId={'state_id':stateId};
    return this.DataService.getAll(city_url,stateId);
  }
  artistregister(url,form_data,userId){
    console.log(form_data);
    var attributeList={
     "user_id":userId,
      "firstname":form_data.firstname,
      "lastname":form_data.lastname,
      "mobile":form_data.mobile,
      "email":form_data.email,
      "address":form_data.address,
      "City":form_data.City,
      "password":form_data.password,
      "State":form_data.State,
      "Country":form_data.Country,
      "ZipCode":form_data.ZipCode,
      "user_role_type":"artist",
      "info_update_type":"all"
      
};
    return this.DataService.createData(url,attributeList);
  }
  getArtistListingData(artist_listing_url,page_data,search){
    var attr={
      page_no:page_data,
      search:search
      
    }
    return this.DataService.getAll(artist_listing_url,attr);
  }
  
}
