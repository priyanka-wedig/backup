import { Injectable } from '@angular/core';
import { DataService } from '../../../Shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class MyprofileService {

  constructor(public DataService:DataService) { }
  
  public getFavouriteArts(fav_art_url,user_id){
    var user_data={'user_id':user_id};
    return this.DataService.getAll(fav_art_url,user_data);
  }
  myArtsData(upload_url,user_id){
    var art_data={'user_id':user_id,"art_flag":'1'};
 
     return this.DataService.getAll(upload_url,art_data);
   }
   updateUserPostFunction(url,accessType,body){
     console.log(body);
    return this.DataService.createData(url,body);
   }
   updateUserImageFunction(url,path,type,u_id,name){
     var attr={
       'path':path,
        'file_name':name,
       'type':type,
       'user_id':u_id

     }
    return this.DataService.create(url,attr);
   }
}
