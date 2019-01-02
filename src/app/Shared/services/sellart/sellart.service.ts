import { DataService } from '../data.service';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SellartService {

  constructor(public DataService:DataService) { }


  getArtData(user_id,url) {
    //var attributeList ={"first_name":first_name,"Last_name":last_name,"password":password,"email":email,user_role_type:"artist"};
    var attributeList={"user_id":user_id};
    return this.DataService.getAll(url,attributeList);
  }
}
