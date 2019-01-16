import { DataService } from "../data.service";
import { Inject, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
//Aws
import { CognitoCallback, CognitoUtil } from "../congnito.service";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";

@Injectable({
  providedIn: "root"
})
export class RegisterService {
  cognitoUser: any;
  constructor(
    public DataService: DataService,
    @Inject(CognitoUtil) public cognitoUtil: CognitoUtil
  ) {}
  //Aws Registration
  public awsRegister(first_name, last_name, password, email, confirmPass, url) {
    var response = {};
    return new Promise((resolve, reject) => {
      var userData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        repeat_password: confirmPass,
        user_role_type: "member"
      };
      //Registring user on AWS
      let attributeList = [];
      attributeList.push(
        new CognitoUserAttribute({ Name: "name", Value: userData.first_name })
      );
     attributeList.push(
        new CognitoUserAttribute({Name: "family_name",Value: userData.last_name
        })
      );
      attributeList.push(
        new CognitoUserAttribute({ Name: "email", Value: userData.email })
      );
      attributeList.push(
        new CognitoUserAttribute({ Name: "phone_number", Value: '' })
      );
      this.cognitoUtil
        .getUserPool()
        .signUp(
          userData.first_name,
          userData.password,
          attributeList,
          null,
          function(err, result) {
            if (err) {
              /* callback.cognitoCallback(err.message, null); */
              response['status']=100;
                response['data']=err;
                reject(response)
            } else {
             /*  console.log(result);
              console.log(
                "UserRegistrationService: registered user is " + result
              ); */
              response['status']=200;
              response['data']=result;
             /*  console.log(result); */
              /* this.cognitoUser=result.user; */
              resolve(response)
              /* return this.DataService.create(url,userData); */
              /* callback.cognitoCallback(null, result); */
            }
          }
        );
    });
  }

  //AWS Ends Here
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
      required: "This field is required",
      email: "This email address is invalid",

      invalid_characters: (matches: any[]) => {
        let matchedCharacters = matches;

        matchedCharacters = matchedCharacters.reduce(
          (characterString, character, index) => {
            let string = characterString;
            string += character;

            if (matchedCharacters.length !== index + 1) {
              string += ", ";
            }

            return string;
          },
          ""
        );

        return `These characters are not allowed: ${matchedCharacters}`;
      }
    };

    return messages;
  }
  public validateForm(
    formToValidate: FormGroup,
    formErrors: any,
    checkDirty?: boolean
  ) {
    const form = formToValidate;

    for (const field in formErrors) {
      if (field) {
        formErrors[field] = "";
        const control = form.get(field);
        const messages = this.validationMessages();
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              if (key && key !== "invalid_characters") {
                formErrors[field] = formErrors[field] || messages[key];
              } else {
                formErrors[field] =
                  formErrors[field] || messages[key](control.errors[key]);
              }
            }
          }
        }
      }
    }

    return formErrors;
  }
  register(first_name, last_name, password, email, confirmPass, url) {
    //var attributeList ={"first_name":first_name,"Last_name":last_name,"password":password,"email":email,user_role_type:"artist"};
    var attributeList = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      repeat_password: confirmPass,
      user_role_type: "member"
    };
    return this.DataService.create(url, attributeList);
  }
  emailVerfied(email_url, token) {
    var attributeList = { verify_mail_token: token };
    return this.DataService.create(email_url, attributeList);
  }
  /* forgetpassword(url, formdata) {
    var attributeList = { email: formdata };
    return this.DataService.create(url, attributeList);
  } */
  verification(code){
    var forgotPassEmail=localStorage.getItem("forgotPassEmail");
    localStorage.removeItem("forgotPassEmail");
    var userPool=this.cognitoUtil.getUserPool();
    const user = {
      Username : forgotPassEmail,
      Pool : userPool
    };
    var response={};
    return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser(user);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
      if (err) {
        response['status']=201;
        response['data']=err; 
        reject(response)
      }
      else{
        response['status']=200;
        response['data']=result;
        resolve(response)
      }
    });
  })
}
inputVerificationCode(verificationCode,Password) {
  var forgotPassEmail=localStorage.getItem("forgotPassEmail");
 /*  console.log(forgotPassEmail); */
 /*  localStorage.removeItem("forgotPassEmail"); */

  var userPool=this.cognitoUtil.getUserPool();
  const authenticationData = {
    Username : forgotPassEmail,
      Pool : userPool
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : forgotPassEmail,
        Pool : userPool
      };
    const cognitoUser = new CognitoUser(userData);
    var response={};
    return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(verificationCode, Password,{
      onSuccess: ()=>{
       
          response['status']=200;
        response['data']='Success'; 
        resolve(response);  
      },
      onFailure: ()=>{ 
      
        response['status']=201;
        response['data']='Enter valid verification code';  
        reject(response);  
      },
    }
  );
});
}
  forgotPassword(email){
    var userPool=this.cognitoUtil.getUserPool();
    var userName=email;
    const authenticationData = {
      Username : userName,
        Pool : userPool
      };
      const authenticationDetails = new AuthenticationDetails(authenticationData);
  
      const userData = {
        Username : userName,
          Pool : userPool
        };
      const cognitoUser = new CognitoUser(userData);
      var response={};
      return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: function (result) {
          response['status']=200;
          response['data']=result;
          console.log(result);
          //this.cognitoUser=result.user;
          resolve(response)
        
        },
      onFailure: function(err) {
        response['status']=201;
        response['data']=err;
        reject(response)
      
      }
        }); 
    }); 
  } 

  resetPassword(url, form_data, code) {
    var attributeList = {
      token: code,
      password: form_data.password,
      confirm_password: form_data.confirmpassword
    };
    return this.DataService.create(url, attributeList);
  }
  verifyToken(url, token_code) {
    var attributeList = {
      token: token_code
    };
    return this.DataService.create(url, attributeList);
  }
}
