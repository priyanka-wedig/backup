import {HttpClient,HttpClientModule,HttpHeaders} from "@angular/common/http";
import { DataService } from "../data.service";
import { Injectable } from "@angular/core";

// AWS Auth
import { environment } from "../../../../environments/environment";
import {
  CognitoCallback,
  CognitoUtil,
  LoggedInCallback
} from "../congnito.service";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession
} from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";
import * as STS from "aws-sdk/clients/sts";
import { jsonpCallbackContext } from "@angular/common/http/src/module";
import { stringify } from "querystring";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(
    public DataService: DataService,
    public cognitoUtil: CognitoUtil
  ) {}

  /*****************AWS Code  Starts Here*******************/

  awsSignIn(email, password) { 
            var userPool=this.cognitoUtil.getUserPool();
    var response={};
        const authenticationData = {
          Username : email,
          Password : password,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);
        const userData = {
          Username : email,
          Pool : userPool
        };
        
        const cognitoUser = new CognitoUser(userData);
        
        return new Promise((resolve, reject) => {
          
          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {  
              this.cognitoUser=userPool.getCurrentUser();
              response['status']=200;
              response['token']=result.getIdToken().getJwtToken();
              localStorage.setItem('Username',this.cognitoUser.username)
              localStorage.setItem('token',response['token'])
              resolve(response)
            },
            onFailure: function(err) {
              response['status']=201;
              response['data']=err;
              reject(response)
            },
          });
        })
  }
 

  updateUserPostFunction(url, accessType, body, token) {
    var attributeList = "";
    let headers = new HttpHeaders();
    var authToken = localStorage.getItem("token");
    var response = {};
    if (accessType == 0) {
      var userName = localStorage.getItem("Username");
      headers = headers.append("Access-Control-Allow-Origin", "token");
      headers = headers.append("token", authToken);
    } else {
      headers = headers.append("Access-Control-Allow-Origin", "token");
      headers = headers.append("token", authToken);
    }
    return this.DataService.createData(url, body, headers);
  }
  /*****************AWS Code Ends Here*******************/
  body = {
    info_update_type: "",
    ip_address: "",
    device_platform_type: "",
    app_version: "",
    user_role_type: "",
    artist_profile_status: " ",
    curator_profile_status: "",
    buyer_profile_status: "",
    sign_up_type: "",
    sign_up_device_type: "",
    sign_up_app_version: "",
    marketing_notifications: "",
    brand_notifications: "",
    stock_notifications: "",
    mobile: "",
    gender: "",
    birthdate: "",
    education: "",
    inspiration: "",
    avatar: "",
    about: "",
    email:""
  };
  accesstype=0;

  login(email, password, url, dfd) {

    return new Promise((resolve, reject) => {
      this.accesstype=1;
      let array = [];
      var attributeList = {
        email: email,
        password: password
      };
      this.awsSignIn(email, password).then(
        result => {
          array = [result];
          let token;
          array.forEach(function(item) {
            token = item.token;
          });
          this.body.info_update_type = "all";
          this.body.ip_address = "198.168.1.101";
          this.body.device_platform_type = "web";
          this.body.email=email;
          (this.body.user_role_type = "member"),
            (this.body.buyer_profile_status = "pending"),
            (this.body.sign_up_type = "general"),
            (this.body.sign_up_device_type = "web"),
            this.updateUserPostFunction(
              "users/update-user-first-profile",
              this.accesstype,
              this.body,
              token
            ).subscribe((res:any)=>{
              resolve(res);
            },(error)=>{
              reject(error);
            });
        },
        error => {
          reject(error);
        }
      );
    });
  }
  
  /**********************Old login backup*********************************/
  /* login2(email, password, url) {
    var attributeList = {
      email: email,
      password: password
    };
    return this.DataService.create(url, attributeList);
  } */
  /**********************Old login backup Ends here*********************************/
}
