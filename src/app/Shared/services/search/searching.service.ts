import { Injectable } from '@angular/core';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class SearchingService {

  constructor(public DataService:DataService) { }


  getSearchingResultData(searching_url,page_no,search_string,flag){
    var search_string_data={
     
      'search':search_string,
      'flag':flag,
      'page':page_no,
    };
    console.log(search_string_data);
    return this.DataService.getAll(searching_url,search_string_data);
  }
}
