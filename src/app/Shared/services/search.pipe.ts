import { Pipe, PipeTransform } from '@angular/core';
import { ArtistService } from './artist/artist.service';

@Pipe({
  name: 'search',
 
})

export class SearchPipe implements PipeTransform {
  constructor(public artist:ArtistService){}
  ArtistList=[];
  transform(value: any,filteredName:string): any {

    if(value.length==0){
      return value;
    }
    if(filteredName ==""){
      return value;
    }
    console.log(filteredName);

    const resultarray=[];
    const artist_listing_url="arts/get-artist-users";
    const page_no=1;
    const search=filteredName;
    this.artist.getArtistListingData(artist_listing_url,page_no,search).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
       
        responsse.result.forEach(element => {  
            
            
            console.log(element);
            resultarray.push(element);
           
          });
        
         // return resultarray;
      }
    });
    // value.forEach(element => {  
     
    //    element[propName] = element[propName].toLowerCase();
    //    filteredName=filteredName.toLowerCase();
    //   if(element[propName] === filteredName){
    //     resultarray.push(element);
    //     console.log(element);
    //   }
  
    //   element[propName1] = element[propName1].toLowerCase();
    //   if(element[propName1] === filteredName){
    //     resultarray.push(element);
    //     console.log(element);
    //   }
    //   element[propName2] = element[propName2].toLowerCase();
    //   if(element[propName2] === filteredName){
    //     resultarray.push(element);
    //     console.log(element);
    //   }
    //   element[propName3] = element[propName3].toLowerCase();
    //   if(element[propName3] === filteredName){
    //     resultarray.push(element);
    //     console.log(element);
    //   }
    
    // });
    return resultarray;
  }

}
