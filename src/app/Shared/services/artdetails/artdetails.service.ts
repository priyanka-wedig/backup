import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ArtdetailsService {

  constructor(public DataService:DataService) { }
  public markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      // if (control.controls) {
      //     control.controls.forEach(c => this.markFormGroupTouched(c));
      // }
    });
  }
  getArtDetailsData(artist_detail_url,art_id){
    var art_data={"art_id":art_id};
    return this.DataService.getAll(artist_detail_url,art_data);
  }
  report(report_type,artId,user_name,description,report_url){
    var report_data={
    'report_type':report_type,
    'name':user_name,
    'art_id':artId,
    'description':description

  };
  console.log(report_data);
    return this.DataService.create(report_url,report_data);
  }
  likeArt(like_url,artId,userId){
    var like_art_data={
    'art_id':artId,
    'user_id':userId

  };
  console.log(like_art_data);
    return this.DataService.create(like_url,like_art_data);
 
}
getlikeArt(get_like_url,artId,userId){
  var like_art_data={
  'art_id':artId,
  'user_id':userId

};
console.log(like_art_data);
  return this.DataService.getAll(get_like_url,like_art_data);

}
  
}
