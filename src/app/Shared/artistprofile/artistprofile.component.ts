import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistProfileService } from "../services/artist-profile/artist-profile.service";
import { AuthService } from '../services/authService/auth.service';
import { ArtdetailsService } from '../services/artdetails/artdetails.service';


@Component({
  selector: 'app-artistprofile',
  templateUrl: './artistprofile.component.html',
  styleUrls: ['./artistprofile.component.css']
})
export class ArtistprofileComponent implements OnInit {
  artistProfile: any = "";
  artistArt = '';
  artist_length: number = 0;
  userId = ""
  token_user_id = "";
  follow_artist_data: string="Unfollow";
  followersCount: any;
  followingCount: any;
  constructor(public route: ActivatedRoute, public ArtistProfile: ArtistProfileService, public auth: AuthService, private router:Router,public ArtDetail: ArtdetailsService) { }

  ngOnInit() {
    console.log();
    this.token_user_id = localStorage.getItem('user_id');
  
    this.userId = this.route.snapshot.params["id"];
   
    const artist_profile_url = "users/get";

    this.ArtistProfile.getArtistProfileData(artist_profile_url, this.userId).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        this.artistProfile = responsse.result
        console.log(this.artistProfile);
      } else {
        this.artistProfile = [];
      }
    });
  

    const get_follow_user_url = 'users/get-follow';
    this.ArtistProfile.ArtistFollowsData(get_follow_user_url,this.userId,this.token_user_id).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        
          this.follow_artist_data=responsse.result;
    
       
      } else {

      }
    });

    const count_url = 'users/count-follow';
    this.ArtistProfile.getArtistFollowersCount(count_url,this.userId,this.token_user_id).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        
          this.followersCount=responsse.count.followers;
          this.followingCount=responsse.count.following;
    
       
      } else {

      }
    });
    this.getArtistArtData(this.userId);
  }
  public onFavourite(artId) {

    const url = 'arts/likes';
    this.ArtDetail.likeArt(url, artId, this.token_user_id).subscribe((responsse: any) => {

      if (responsse.success == true) {
        console.log(responsse);
        if (responsse.msg == "User liked successfully.") {
          this.getArtistArtData(this.userId);
         
        
        } else {
          this.getArtistArtData(this.userId);
         
        }

      } else {

      }
    });
  }


  public followArtist(user_id) {
    const follow_artist_url="users/follow";
    // const action="requested";
    this.ArtistProfile.getArtistFollowsData(follow_artist_url,user_id,this.token_user_id).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        
          this.follow_artist_data=responsse.params;
          const count_url = 'users/count-follow';
          // this.ArtistProfile.getArtistFollowersCount(count_url,user_id,this.token_user_id).subscribe((responsse: any) => {
          //   console.log(responsse);
          //   if (responsse.success == true) {
              
          //       this.followersCount=responsse.count.followers;
          //       this.followingCount=responsse.count.following;
          
             
          //   } else {
      
          //   }
          // });
      
       
      } else {

      }
    });
  }
  public getArtistArtData(user_id){
    const artist_art_url = "arts/get-user-arts_sale";

    this.ArtistProfile.getArtistSaleArtData(artist_art_url, user_id, null).subscribe((responsse: any) => {

      if (responsse.success == true) {
        this.artistArt = responsse.result;
        this.artist_length = <number>this.artistArt.length;
        console.log(this.artistArt);
      } else {
        this.artistArt = '';
      }
    });
  }
}
