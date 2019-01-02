import { Pipe, PipeTransform } from '@angular/core';
import { SearchingService } from '../services/search/searching.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
 
  constructor(public search:SearchingService){}
  SearchList=[];

  transform(value: any, filteredName:string,flag:string): any {
    if(value.length==0){
      return value;
    }
    if(filteredName ==""){
      return value;
    }
    console.log(filteredName);
    const resultarray=[];
   localStorage.setItem('filter_value',filteredName);
    const searching_url="arts/search";
    
    const page_no=1;
    this.search.getSearchingResultData(searching_url,page_no,filteredName,flag).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        
        responsse.result.forEach(element => {  
            
            
          console.log(element);
          resultarray.push(element);
         
        });
          
      }
    });
    return resultarray;
  }

}
