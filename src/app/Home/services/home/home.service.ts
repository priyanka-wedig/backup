import { Injectable } from '@angular/core';
import { DataService } from 'src/app/Shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public DataService:DataService) { }

  getHomePageData(url){
    return this.DataService.getAll(url,null);
  }

}
