import { Component, OnInit } from '@angular/core';
import  {Router, ActivatedRoute} from '@angular/router';
import { RegisterService } from "../../Shared/services/signup/register.service";
declare var $: any;

@Component({
  selector: 'app-emailverificationsuccess',
  templateUrl: './emailverificationsuccess.component.html',
  styleUrls: ['./emailverificationsuccess.component.css']
})
export class EmailverificationsuccessComponent implements OnInit {
  token:'';
  constructor(public route:ActivatedRoute,
    private router:Router,public signup: RegisterService) { 
 

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token']

     
    });
    //localStorage.setItem('token', this.token);
    const email_url="users/email_verified";
    const token_val=localStorage.getItem('token');
    console.log(token_val);
    this.signup.emailVerfied(email_url, this.token).subscribe((responsse: any) => {
     console.log(responsse);
      if (responsse.success == true) {
      
      }else if (responsse.success == false && this.token !=null) {
       
        let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl||'/my-profile']);
      }
      else {
      
        let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl||'/']);
        setTimeout(()=>{
        $('.jq_login_modal').modal('show');
        $(".jq_login_modal").addClass("in");
        $(".jq_login_modal").css("display",'block');
      },200);
        
       
      }
    });
  }
  emailVerified(){
   
    
   
        $('.jq_login_modal').modal('show');
        $(".jq_login_modal").addClass("in");
        $(".jq_login_modal").css("display",'block');
        //$(' #login-modal').modal('show');
       
     
  }

}
