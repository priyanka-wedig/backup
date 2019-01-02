import { Component, OnInit,NgModule} from '@angular/core';
import { SearchingService } from '../services/search/searching.service';
import { FilterPipe } from '../services/filter.pipe';

@NgModule({
  declarations:[
    FilterPipe,
  ]
})
@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  searching_value="";
  SearchList="";
  filteredName="";
  filterflag="arts";
  constructor(public search:SearchingService) { }

  ngOnInit() {
   
    this.searching_value=localStorage.getItem('filter_value');
    this.filteredName=this.searching_value;
    const searching_url="arts/search";
    
    const page_no=1;
    const flag="art";
    this.search.getSearchingResultData(searching_url,page_no, this.searching_value,flag).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        
        this.SearchList = responsse.result 
          
      }else{
    
      }
    });
  }
  getArt(){
    this.filteredName=localStorage.getItem('filter_value');;
    const searching_url="arts/search";
    
    const page_no=1;
    const flag="art";
    this.filterflag="arts";
    this.search.getSearchingResultData(searching_url,page_no, this.searching_value,flag).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        
        this.SearchList = responsse.result 
          
      }else{
    
      }
    });
  }
  getUsers(){
    this.filteredName=localStorage.getItem('filter_value');;
    const searching_url="arts/search";
    
    const page_no=1;
    const flag="users";
    this.filterflag="users";
    this.search.getSearchingResultData(searching_url,page_no, this.searching_value,flag).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        
        this.SearchList = responsse.result 
          
      }else{
    
      }
    });
  }

}
