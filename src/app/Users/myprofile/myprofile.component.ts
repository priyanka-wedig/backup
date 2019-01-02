import { Component, OnInit } from '@angular/core';

import { ArtistService } from "../../Shared/services/artist/artist.service";
import { MyprofileService } from "../../Users/services/myprofile/myprofile.service";
import { AuthService } from 'src/app/Shared/services/authService/auth.service';
import { ArtdetailsService } from 'src/app/Shared/services/artdetails/artdetails.service';
import { ArtistProfileService } from 'src/app/Shared/services/artist-profile/artist-profile.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  AllArtsData: any="";
  favouriteArtsData: any="";
  user_id="";
  full_name="";
  myuploadStatus:boolean=false;
  uploadstatusActiveClass:string="";
  favouritetSatusActiveClass:string="";
  base64Image: any="";
  
  backgroundBase64Image:any="";
  CountryName: any;
  cityName: any;
  artist_length: number;
  followersCount: any;
  followingCount: any;

  constructor(public artist:ArtistService,public myprofile:MyprofileService,public auth:AuthService,public ArtDetail:ArtdetailsService,public ArtistProfile:ArtistProfileService) { }

  ngOnInit() {
    
    this.user_id = localStorage.getItem('user_id');
    this.getUserUploadsArts(this.user_id);
    this.FavArts( this.user_id);

    const url = 'users/get';
    this.artist.getBuyerData(url, this.user_id).subscribe((responsse: any) => {
     console.log(responsse);
      if (responsse.success == true) {
       this.full_name =responsse.result.firstname +' '+responsse.result.lastname;
       this.base64Image =responsse.result.image_url; 
       this.backgroundBase64Image=responsse.result.header_image_url;
       this.CountryName=responsse.result.country_name;
        this.cityName=responsse.result.city_name;
      } else {

      }
    });
    const count_url = 'users/count-follow';
    this.ArtistProfile.getArtistFollowersCount(count_url,this.user_id,null).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        
          this.followersCount=responsse.count.followers;
          this.followingCount=responsse.count.following;
    
       
      } else {

      }
    });

  }
  public onFavourite(artId) {

    const url = 'arts/likes';
    this.ArtDetail.likeArt(url, artId, this.user_id).subscribe((responsse: any) => {

      if (responsse.success == true) {
        console.log(responsse);
        if (responsse.msg == "User liked successfully.") {
          this.getUserUploadsArts(this.user_id);
          this.FavArts( this.user_id);
          
        } else {
          this.getUserUploadsArts(this.user_id);
          this.FavArts( this.user_id);
        }

      } else {

      }
    });
  }
  public getUserUploadsArts(userId){
    const upload_url="arts/get-user-arts";
    this.myprofile.myArtsData(upload_url,userId).subscribe((res:any)=>{
      if(res.success == true){
        
        this.AllArtsData=res.result;
        this.artist_length = <number>this.AllArtsData.length;
        this.myuploadStatus=true;
        this.uploadstatusActiveClass="in active";
        this.favouritetSatusActiveClass="";
      
      }else{
        this.myuploadStatus=false;
        this.uploadstatusActiveClass="";
        this.favouritetSatusActiveClass="in active";
        this.AllArtsData="";
      }
    });
  }
  public FavArts(userId){
    const fav_art_url = 'arts/my-favorite-arts';
    this.myprofile.getFavouriteArts(fav_art_url, userId).subscribe((responsse: any) => {
     console.log(responsse);
      if (responsse.success == true) {
        this.favouriteArtsData=responsse.result;
      } else {
        this.favouriteArtsData="";
      }
    });
  }
}
