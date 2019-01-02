import { Component, OnInit } from '@angular/core';
import { UploadartService } from 'src/app/Arts/services/uploadart/uploadart.service';
import { ArtistProfileService } from '../services/artist-profile/artist-profile.service';
import { ConditionalExpr } from '@angular/compiler';
import { AuthService } from '../services/authService/auth.service';
import { ArtdetailsService } from '../services/artdetails/artdetails.service';
declare var $: any;
@Component({
  selector: 'app-artisan-galleria',
  templateUrl: './artisan-galleria.component.html',
  styleUrls: ['./artisan-galleria.component.css']
})
export class ArtisanGalleriaComponent implements OnInit {

  ArtisanGalleriArt = "";
  p: number = 1;
  checkedValue = "";
  SubjectList: Array<any>;
  GenreList: Array<any>;
  MediumList: Array<any>;
  MoodList: Array<any>;
  genre_array: Array<any> = [];
  subject_array: Array<any> = [];
  mood_array: Array<any> = [];
  size_array: Array<any> = [];
  price_array: Array<any> = [];
  medium_array: Array<any> = [];
  artist_gallery: number;

  token_user_id: string;
  artist_length: number;
  artist_id: any;
  orderBy: any;
  constructor(public Uploadart: UploadartService, public ArtistProfile: ArtistProfileService, public auth: AuthService, public ArtDetail: ArtdetailsService) { }

  ngOnInit() {
    this.token_user_id = localStorage.getItem('user_id');
    var options = [];

    $('.dropdown-menu').click(function (event) {
      event.stopPropagation();
    })

    const subject_url = "arts/get-art-subjects";
    this.Uploadart.getArtSubjectData(subject_url).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.SubjectList = responsse.result
      }
    });
    const genre_url = "arts/get-art-genres";
    this.Uploadart.getArtGenreData(genre_url).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.GenreList = responsse.result
      }
    });
    const medium_url = "arts/get-art-mediums";
    this.Uploadart.getArtMediumData(medium_url).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.MediumList = responsse.result
      }
    });
    const mood_url = "arts/get-art-moods";
    this.Uploadart.getArtMoodData(mood_url).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.MoodList = responsse.result
      }
    });

    const artist_art_url = "arts/filter";

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, null, null, null, null, null, null,null).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        this.artist_length = <number>this.ArtisanGalleriArt.length;
        
      } else {
        this.ArtisanGalleriArt = '';
      }
    });

  }
  genre_data_string = "";
  subject_data_string = "";
  medium_data_string = "";
  mood_data_string = "";
  size_data_string = "";
  price_data_string = "";
  name = false;
  subjectname = false;
  mediumname = false;
  moodname = false;
  size = false;
  price = false;
  order=false;
  public artSize: Array<Object> = [
    { id: 'small', text: 'Small(up to 12")' },
    { id: 'medium', text: 'Medium(up to 24")' },
    { id: 'large', text: 'Large(up to 48")' },
    { id: 'extra_large', text: 'Extra Large' },
  ];
  public artOrder: Array<Object> = [
    
    { id: 'most_recent', text: 'Most Recent' },
    { id: 'popular', text: 'Popular' },
    { id: 'lowest_price', text: 'Lowest Price' },
    { id: 'highest_price', text: 'Highest Price' },
    { id: 'a-z', text: 'Artist Name(A to Z)' },
    { id: 'z-a', text: 'Artist Name(Z to A)' },
  ];

  public artprice: Array<Object> = [
    { id: 'BETWEEN 0 AND 200', text: 'Below 200' },
    { id: 'BETWEEN 200 AND 500', text: '200-500' },
    { id: 'BETWEEN 500 AND 2500', text: '500-2500' },
    { id: 'BETWEEN 2500 AND 10000', text: '2500-10000' },
    { id: '> 10000', text: '10000+' },
  ];
  onChangeGenre(event, cat: any) { // Use appropriate model type instead of any

    console.log(cat);
    if (cat.name == true) {
      this.genre_array.push(cat.id);
    } else {

      this.genre_array = this.arrayRemove(this.genre_array, cat.id);

    }
    console.log(this.genre_array);
    const artist_art_url = "arts/filter";
    this.genre_data_string = this.genre_array.toString();
    console.log(this.genre_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {
        this.ArtisanGalleriArt = '';

      }
    });
    return false;
  }

  arrayRemove(arr, value) {

    const index = arr.indexOf(value);
    arr.splice(index, 1);
    return arr;
  }
  onChangeSubject(event, subject: any) { // Use appropriate model type instead of any

    if (subject.subjectname == true) {
      this.subject_array.push(subject.id);
    } else {

      this.subject_array = this.arrayRemove(this.subject_array, subject.id);

    }
    console.log(this.subject_array);
    const artist_art_url = "arts/filter";

    this.subject_data_string = this.subject_array.toString();

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;


      } else {
        this.ArtisanGalleriArt = '';
      }
    });
    return false;
  }

  onChangeMedium(event, medium: any) { // Use appropriate model type instead of any

    if (medium.mediumname == true) {
      this.medium_array.push(medium.id);
    } else {

      this.medium_array = this.arrayRemove(this.medium_array, medium.id);

    }
    console.log(this.medium_array);
    const artist_art_url = "arts/filter";

    this.medium_data_string = this.medium_array.toString();
    console.log(this.medium_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;


      } else {
        this.ArtisanGalleriArt = '';
      }
    });
    return false;
  }

  onChangeMood(event, mood: any) { // Use appropriate model type instead of any

    if (mood.moodname == true) {
      this.mood_array.push(mood.id);
    } else {

      this.mood_array = this.arrayRemove(this.mood_array, mood.id);

    }
    console.log(this.mood_array);
    const artist_art_url = "arts/filter";

    this.mood_data_string = this.mood_array.toString();
    console.log(this.mood_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;


      } else {
        this.ArtisanGalleriArt = '';
      }
    });
    return false;
  }
  onChangeSize(event, size: any) { // Use appropriate model type instead of any

    if (size.size == true) {
      this.size_array.push(size.id);
    } else {

      this.size_array = this.arrayRemove(this.size_array, size.id);

    }
    console.log(this.size_array);
    const artist_art_url = "arts/filter";

    this.size_data_string = this.size_array.toString();
    console.log(this.size_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;


      } else {
        this.ArtisanGalleriArt = '';
      }
    });
    return false;
  }
  onChangeprice(event, price: any) {
    if (price.price == true) {
      this.price_array.push(price.id);
    } else {

      this.price_array = this.arrayRemove(this.price_array, price.id);

    }
    console.log(this.price_array);
    const artist_art_url = "arts/filter";

    this.price_data_string = this.price_array.toString();
    console.log(this.price_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;


      } else {
        this.ArtisanGalleriArt = '';
      }
    });

  }
  clearallGenre(event) {

    for (var i = 0; i < this.GenreList.length; i++) {
      this.GenreList[i].name = false;

    }
    this.genre_array = [];

    const artist_art_url = "arts/filter";

    this.genre_data_string = this.genre_array.toString();
    console.log(this.genre_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {
        this.ArtisanGalleriArt = '';

      }
    });
  }

  clearallSubject(event) {

    for (var i = 0; i < this.SubjectList.length; i++) {
      this.SubjectList[i].subjectname = false;
    }
    this.subject_array = [];

    const artist_art_url = "arts/filter";

    this.subject_data_string = this.subject_array.toString();
    console.log(this.subject_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {
        this.ArtisanGalleriArt = '';

      }
    });
  }
  clearallMedium(event) {

    for (var i = 0; i < this.MediumList.length; i++) {
      this.MediumList[i].mediumname = false;
    }
    this.medium_array = [];

    const artist_art_url = "arts/filter";

    this.medium_data_string = this.medium_array.toString();
    console.log(this.medium_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {
        this.ArtisanGalleriArt = '';

      }
    });
  }
  clearallMood(event) {

    for (var i = 0; i < this.MoodList.length; i++) {
      this.MoodList[i].moodname = false;
    }
    this.mood_array = [];

    const artist_art_url = "arts/filter";

    this.mood_data_string = this.mood_array.toString();
    console.log(this.mood_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {

        this.ArtisanGalleriArt = '';
      }
    });
  }
  resetall() {
    for (var i = 0; i < this.GenreList.length; i++) {
      this.GenreList[i].name = false;

    }
    this.genre_array = [];
    for (var i = 0; i < this.SubjectList.length; i++) {
      this.SubjectList[i].subjectname = false;
    }
    this.subject_array = [];


    for (var i = 0; i < this.MediumList.length; i++) {
      this.MediumList[i].mediumname = false;
    }
    this.medium_array = [];


    for (var i = 0; i < this.MoodList.length; i++) {
      this.MoodList[i].moodname = false;
    }
    this.mood_array = [];

    for (var i = 0; i < this.artprice.length; i++) {
      this.artprice[i]['price'] = false;
    }
    this.price_array = [];

    for (var i = 0; i < this.artSize.length; i++) {
      this.artSize[i]['size'] = false;
    }
    this.size_array = [];

    const artist_art_url = "arts/filter";

    this.genre_data_string = this.genre_array.toString();
    this.subject_data_string = this.subject_array.toString();
    this.medium_data_string = this.medium_array.toString();
    this.mood_data_string = this.mood_array.toString();
    this.price_data_string = this.price_array.toString();
    this.size_data_string = this.size_array.toString();

    console.log(this.subject_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {
        this.ArtisanGalleriArt = '';

      }
    });
  }
  clearallPrice(event) {

    for (var i = 0; i < this.artprice.length; i++) {
      this.artprice[i]['price'] = false;
    }
    this.price_array = [];

    const artist_art_url = "arts/filter";

    this.price_data_string = this.price_array.toString();
    console.log(this.price_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {
        this.ArtisanGalleriArt = '';

      }
    });
  }
  clearallSize(event) {

    for (var i = 0; i < this.artSize.length; i++) {
      this.artSize[i]['size'] = false;
    }
    this.size_array = [];

    const artist_art_url = "arts/filter";

    this.size_data_string = this.size_array.toString();
    console.log(this.size_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {
        this.ArtisanGalleriArt = '';

      }
    });
  }
  onChangeRadio(event, ordersBy: any){
 
    this.order=true;
    console.log(ordersBy.id);
    this.orderBy=ordersBy.id;
    const artist_art_url = "arts/filter";
    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {
        this.ArtisanGalleriArt = '';

      }
    });

  }
  selectallGenre() {
    for (var i = 0; i < this.GenreList.length; i++) {
      this.GenreList[i].name = true;
      this.genre_array.push(this.GenreList[i].id);
    }


    const artist_art_url = "arts/filter";

    this.genre_data_string = this.genre_array.toString();
    console.log(this.genre_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {

        this.ArtisanGalleriArt = '';
      }
    });
  }
  selectallSubject() {
    for (var i = 0; i < this.SubjectList.length; i++) {
      this.SubjectList[i].subjectname = true;
      this.subject_array.push(this.SubjectList[i].id);
    }


    const artist_art_url = "arts/filter";

    this.subject_data_string = this.subject_array.toString();
    console.log(this.subject_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {
        this.ArtisanGalleriArt = '';

      }
    });
  }
  selectallMedium() {
    for (var i = 0; i < this.MediumList.length; i++) {
      this.MediumList[i].mediumname = true;
      this.medium_array.push(this.MediumList[i].id);
    }


    const artist_art_url = "arts/filter";

    this.medium_data_string = this.medium_array.toString();
    console.log(this.medium_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {

        this.ArtisanGalleriArt = '';
      }
    });
  }
  selectallMood() {
    for (var i = 0; i < this.MoodList.length; i++) {
      this.MoodList[i].moodname = true;
      this.mood_array.push(this.MoodList[i].id);
    }


    const artist_art_url = "arts/filter";

    this.mood_data_string = this.mood_array.toString();
    console.log(this.mood_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {
        this.ArtisanGalleriArt = '';

      }
    });
  }
  selectallPrice() {
    for (var i = 0; i < this.artprice.length; i++) {
      this.artprice[i]['price'] = true;
      this.price_array.push(this.artprice[i]['id']);
    }


    const artist_art_url = "arts/filter";

    this.price_data_string = this.price_array.toString();
    console.log(this.price_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {


      }
    });
  }
  selectallSize() {
    for (var i = 0; i < this.artSize.length; i++) {
      this.artSize[i]['size'] = true;
      this.size_array.push(this.artSize[i]['id']);
    }


    const artist_art_url = "arts/filter";

    this.size_data_string = this.size_array.toString();
    console.log(this.size_data_string);

    this.ArtistProfile.getArtisanGalleriArtData(artist_art_url, this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
      console.log(responsse);

      if (responsse.success == true) {
        this.ArtisanGalleriArt = responsse.result;
        //this.checkedValue="checked";

      } else {
        this.ArtisanGalleriArt = '';

      }
    });
  }
  public onFavourite(artId) {

    const url = 'arts/likes';
    this.ArtDetail.likeArt(url, artId, this.token_user_id).subscribe((responsse: any) => {

      if (responsse.success == true) {
        console.log(responsse);
        if (responsse.msg == "User liked successfully.") {
          const artist_art_url = "arts/filter";

          this.ArtistProfile.getArtisanGalleriArtData(artist_art_url,  this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
            console.log(responsse);
            if (responsse.success == true) {
              this.ArtisanGalleriArt = responsse.result;
              this.artist_length = <number>this.ArtisanGalleriArt.length;
              
            } else {
              this.ArtisanGalleriArt = '';
            }
          });
        } else {
          const artist_art_url = "arts/filter";

          this.ArtistProfile.getArtisanGalleriArtData(artist_art_url,  this.genre_data_string, this.subject_data_string, this.mood_data_string, this.medium_data_string, this.price_data_string, this.size_data_string,this.orderBy).subscribe((responsse: any) => {
            console.log(responsse);
            if (responsse.success == true) {
              this.ArtisanGalleriArt = responsse.result;
              this.artist_length = <number>this.ArtisanGalleriArt.length;
              
            } else {
              this.ArtisanGalleriArt = '';
            }
          });
        }

      } else {

      }
    });
  }


}



