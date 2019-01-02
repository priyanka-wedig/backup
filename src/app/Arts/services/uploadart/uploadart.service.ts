import { Injectable } from '@angular/core';
import { DataService } from '../../../Shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class UploadartService {

  constructor(public DataService:DataService) { }

  getArtSubjectData(subject_url){
    return this.DataService.getAll(subject_url,null,null,'GET');
  }
  getArtMoodData(mood_url){
    return this.DataService.getAll(mood_url,null,null,'GET');
  }
  getArtGenreData(genre_url){
    return this.DataService.getAll(genre_url,null,null,'GET');
  }
  getArtMediumData(medium_url){
    return this.DataService.getAll(medium_url,null,null,'GET');
  }
  submitArtData(art_url,formdata,artwork_details,user_id,art_id,private_gallery=null){
   
    var attributeList={
      "art_title":formdata.name,
      "description":formdata.description,
      "price":formdata.price,
      "quantity":formdata.quantity,
      "height":artwork_details.height,
      "width":artwork_details.width,
      "depth":artwork_details.depth,
      "subject_id":artwork_details.subject,
      "genre_id":artwork_details.genre,
      "mood_id":artwork_details.mood,
      "medium_id":artwork_details.medium,
      'user_id':user_id,
      'private_gallery':private_gallery,
      'art_id':art_id
  };
  console.log(attributeList);
    return this.DataService.create(art_url,attributeList);
  }
  UploadImageData(art_url,filedata,original_image,file_url,art_id,audio_name=null,video_name=null){


    var attributeList={
      "name":filedata,
      'path':file_url,
      'original_image':original_image,
      'art_id':art_id,
      'audio_name':audio_name,
      'video_name':video_name,
      
    };
    console.log(attributeList);
    return this.DataService.upload_image(art_url,attributeList,'application/json');
  }

  removeUType(update_url,user_id){
   var attributeList={
        "user_id":user_id,
        "u_type":'0'
       };
    console.log(attributeList);
    return this.DataService.create(update_url,attributeList);
  }
}
