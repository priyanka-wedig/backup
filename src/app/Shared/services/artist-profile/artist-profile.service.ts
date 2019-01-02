import { Injectable, ɵConsole } from '@angular/core';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistProfileService {
  token_user_id: string;

  constructor(public DataService:DataService) { }

  getArtistProfileData(artist_profile_url,user_id){
    var user_data={"user_id":user_id};
    return this.DataService.getAll(artist_profile_url,user_data);
  }
  getArtistSaleArtData(artist_art_url,user_id,artId){
    this.token_user_id = localStorage.getItem('user_id');
    var user_data={"user_id":user_id,'art_id':artId,logged_id:this.token_user_id};
    return this.DataService.getAll(artist_art_url,user_data);
  }

  getArtisanGalleriArtData(artist_art_url,genere_ids_str=null,subject_id_str=null,mood_id_str=null,medium_id_str=null,price_str=null,art_size=null,order_by=null){
    this.token_user_id = localStorage.getItem('user_id');
    var user_data={
      'page':1,
      'genere_ids_str':genere_ids_str,
      'subject_id_str':subject_id_str,
      'mood_id_str':mood_id_str,
      'medium_id_str':medium_id_str,
      'price_str':price_str,
      'art_size':art_size,
      'field':order_by,
      'user_id': this.token_user_id
    };
    console.log(user_data);

    return this.DataService.getAll(artist_art_url,user_data);
  }

  getArtistFollowsData(follow_artist_url,user_id,followers_id){
    var user_data={"user_id":user_id,'follower_id':followers_id};
    return this.DataService.create(follow_artist_url,user_data);
  }
  ArtistFollowsData(follow_artist_url,user_id,followers_id){
    var user_data={"user_id":user_id,'follower_id':followers_id};
    console.log(user_data);
    return this.DataService.getAll(follow_artist_url,user_data);
  }
  getArtistFollowersCount(follow_artist_url,user_id,followers_id){
    var user_data={"user_id":user_id,'follower_id':followers_id};
    console.log(user_data);
    return this.DataService.getAll(follow_artist_url,user_data);
  }
}
