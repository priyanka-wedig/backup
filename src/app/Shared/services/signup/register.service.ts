import { DataService } from '../data.service';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( public DataService:DataService) { }
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
  register(first_name,last_name, password,email,confirmPass,url) {
    //var attributeList ={"first_name":first_name,"Last_name":last_name,"password":password,"email":email,user_role_type:"artist"};
    var attributeList={
      "first_name":first_name,
      "last_name":last_name,
      "email":email,
      "password":password,
      "repeat_password":confirmPass,
      "user_role_type":"member"
      
};
    return this.DataService.create(url,attributeList);
  }
  emailVerfied(email_url,token){
    var attributeList={'verify_mail_token':token};
    return this.DataService.create(email_url,attributeList);
  }
  forgetpassword(url,formdata){
    var attributeList={'email':formdata};
    return this.DataService.create(url,attributeList);
  }
  resetPassword(url,form_data,code){
    var attributeList={
      "token":code,
    "password":form_data.password,
    "confirm_password":form_data.confirmpassword}
    return this.DataService.create(url,attributeList);
  }
  verifyToken(url,token_code){
    var attributeList={
      "token":token_code}
    return this.DataService.create(url,attributeList);
  }
}
