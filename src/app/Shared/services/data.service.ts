import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { promise } from 'protractor';


@Injectable()
export class DataService {
 //private apiUrl='http://192.168.1.131:3000/api/v1/';
 // private apiUrl='http://52.34.138.228:3000/api/v1/';
 private apiUrl='http://skeuomodev.indyo.com/api/api/v1/';
  constructor(private http: HttpClient) { }

  getAll(url,body,headerData={},methode="POST") {
   
     const getUrl=this.apiUrl+url;
     const  getMehode=methode;if(methode == "POST"){
     
       return  this.http.post(getUrl,body,{headers:headerData})
          .map(result => result)
          .catch(this.handleError)
      }else{
        console.log(methode);
        return this.http.get(getUrl,{headers:headerData})
        .map(result => result)
        .catch(this.handleError)
      }
 
  }  
  
   create(url,resource) {
    const createUrl=this.apiUrl+url;
    console.log(resource);
    return this.http.post(createUrl,resource)//JSON.stringify(resource)
      .map(response => response)
      .catch(this.handleError);
  }
  createData(url,resource) {
    const createUrl=this.apiUrl+url;
    console.log(resource);
    return this.http.put(createUrl,resource)//JSON.stringify(resource)
      .map(response => response)
      .catch(this.handleError);
  }

   update(url,resource) {
    const updateUrl=this.apiUrl+url;
    return this.http.patch(updateUrl + '/' + resource.id, JSON.stringify({ isRead: true }))
      .map(response => response)      
      .catch(this.handleError);
  }
  upload_image(url,resource,headerData) {
    const createUrl=this.apiUrl+url;
    console.log(resource);
    return this.http.post(createUrl,resource,{headers:headerData})//JSON.stringify(resource)
      .map(response => response)
      .catch(this.handleError);
  }
    delete(url,id) {
    const deleteUrl=this.apiUrl+url
      return this.http.delete(deleteUrl + '/' + id)
      .map(response => response)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log(error);
    if (error.status === 400)
      return Observable.throw(new BadInput(error));
  
    if (error.status === 404)
      return Observable.throw(new NotFoundError());
    
    return Observable.throw(new AppError(error));
  }
}
