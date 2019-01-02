import { Component, OnInit } from '@angular/core';
import { MyprofileService } from 'src/app/Users/services/myprofile/myprofile.service';

@Component({
  selector: 'app-myarts',
  templateUrl: './myarts.component.html',
  styleUrls: ['./myarts.component.css']
})
export class MyartsComponent implements OnInit {
  AllArtsData: Array<File>;
  user_id="";
  constructor(public myarts:MyprofileService) { 
  }
  ngOnInit() {
    const upload_url="arts/get-user-arts";
    this.user_id = localStorage.getItem('user_id');
   
    this.myarts.myArtsData(upload_url,this.user_id).subscribe((res:any)=>{
      console.log(res);
      if(res.success == true){
        
        this.AllArtsData=res.result;
       
      }
  });
  }

}
