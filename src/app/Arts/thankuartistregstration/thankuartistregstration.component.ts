import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadartService } from '../services/uploadart/uploadart.service';

@Component({
  selector: 'app-thankuartistregstration',
  templateUrl: './thankuartistregstration.component.html',
  styleUrls: ['./thankuartistregstration.component.css']
})
export class ThankuartistregstrationComponent implements OnInit {

  constructor(public route:ActivatedRoute,private router:Router,public Uploadart:UploadartService) { }
  user_id="";
  
  ngOnInit() {
    this.user_id=localStorage.getItem('user_id');
  }
  skip(){
    const remove_url="users/type";
    let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigate([returnUrl||'/']);
    this.Uploadart.removeUType(remove_url, this.user_id).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.success == true){
          
        
      }
    });
  }
  continue(){
    const remove_url="users/type";
    let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigate([returnUrl||'/upload-art']);
    this.Uploadart.removeUType(remove_url, this.user_id).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.success == true){
          
        
      }
    });
  }
}
