import { Component, OnInit } from '@angular/core';
import  {Router, ActivatedRoute} from '@angular/router';
import { SellartService } from "../../Shared/services/sellart/sellart.service";
declare var $: any;

@Component({
  selector: 'app-sellarart',
  templateUrl: './sellarart.component.html',
  styleUrls: ['./sellarart.component.css']
})
export class SellarartComponent implements OnInit {
  user_id ='';
  token ="";
  visiblepanel:boolean=true;
  constructor(public route:ActivatedRoute,
    private router:Router,public sellart:SellartService ) { }

  ngOnInit() {
   
  
  }
  nextstep(){
    let role = localStorage.getItem('role');
  
    if(role=="member"){
      let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl||'/artist-register']);
      $('html, body').animate({
        scrollTop: $("#myDiv").offset().top
}, 1000);
    }else if(role=="artist"){
    
      const art_work_url ='arts/get-user-arts';
      this.user_id =localStorage.getItem('user_id');
      this.sellart.getArtData(this.user_id,art_work_url).subscribe((responsse: any) => {
        //console.log(responsse);
        if (responsse.success == true) {
              console.log(responsse.result.length);
            if(responsse.result.length>0){
              let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
              this.router.navigate([returnUrl||'/arts-upload']);
              $('html, body').animate({
                scrollTop: $("#myDiv").offset().top
        }, 1000);
            }
        }else{
          let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl||'/upload-art']);
          $('html, body').animate({
            scrollTop: $("#myDiv").offset().top
    }, 1000);
        }
      });
    }else{
      
      let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl||'/artist-register']);
      $('html, body').animate({
        scrollTop: $("#myDiv").offset().top
}, 1000);
    }
  }

}
