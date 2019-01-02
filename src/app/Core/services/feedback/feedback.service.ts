import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/Shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
  constructor(public DataService:DataService) { }
  public markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      // if (control.controls) {
      //     control.controls.forEach(c => this.markFormGroupTouched(c));
      // }
    });
  }
  saveFeedback(feedback_data,url){
    var attributeList={
      "name":feedback_data.name,
      "email":feedback_data.email,
      "feedback_type":feedback_data.feedback_type,
      "feedback":feedback_data.comment,
      
    };
    return this.DataService.create(url,attributeList);
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
  
}
