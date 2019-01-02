import { Component, OnInit, NgModule } from '@angular/core';
import { ArtistService } from '../services/artist/artist.service';
import { SearchPipe } from '../services/search.pipe';

@NgModule({
  declarations:[
    SearchPipe,
  ]
})

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  constructor( public artist:ArtistService) { }
  ArtistList=[];
  filteredName="";
  ngOnInit() {
    const artist_listing_url="arts/get-artist-users";
    const page_no=1;
    const search="";
    this.artist.getArtistListingData(artist_listing_url,page_no,search).subscribe((responsse: any) => {
     console.log(responsse);
      if (responsse.success == true) {
        
        this.ArtistList = responsse.result 
          
      }else{
        this.ArtistList=[];
      }
    });
  }


}
