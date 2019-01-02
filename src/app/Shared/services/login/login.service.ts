import { DataService } from '../data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public DataService:DataService) { }

  login(email,password,url) {
  
    var attributeList={
      "email":email,
      "password":password     
};
    return this.DataService.create(url,attributeList);
  }
}
