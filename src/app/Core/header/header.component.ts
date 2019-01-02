import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from "@angular/forms";
import { RegisterService } from "../../Shared/services/signup/register.service";
import { LoginService } from "../../Shared/services/login/login.service";
import { ToastrService } from 'ngx-toastr';
import  {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../Shared/services/authService/auth.service';
import { SellartService } from "../../Shared/services/sellart/sellart.service";
import { ArtistService } from 'src/app/Shared/services/artist/artist.service';
import { UploadartService } from 'src/app/Arts/services/uploadart/uploadart.service';
import { FeedbackService } from '../services/feedback/feedback.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginform: FormGroup;
  feedbackForm:FormGroup;
  LoginLoader: boolean= false;
  FeedbackLoader:boolean=false;
  public regform: FormGroup;
  public forgetform: FormGroup;
  public confirmpasswordform: FormGroup;
  public registerpanel: boolean = true;
  registercontent1 = "Register your";
  registercontent2 = "Skeuomo account";
  registerLoader: boolean = false;
  validationmessage;
  validationmessage1;
  token :any;
  base64Image: any="";
  SubjectList: any;
  GenreList: any;
  MediumList: any;
  MoodList: any;
  forgotPassLoader: boolean = false;
  confirmPassLoader:boolean = false;
  user_first_name:any;
  constructor(public auth:AuthService,public form: FormBuilder,public signup: RegisterService,public Login: LoginService,public toastr: ToastrService
    ,public route:ActivatedRoute,public Uploadart:UploadartService,public feedbackService:FeedbackService,
    private router:Router,public sellart:SellartService,public artist:ArtistService
    ) {
    
    }
    sub_len:number=0;
    gen_len:number=0;
    medium_len:number=0;
    mood_len:number=0;
    verification_code="";
    code="";
  ngOnInit() {

   


    this.route.queryParams.subscribe(params => {

      this.verification_code = params['verification_code']
     
    });

    if(this.verification_code!=undefined){
      const verify_url="users/token";
      this.signup.verifyToken(verify_url,this.verification_code).subscribe((responsse: any) => {
      
         if (responsse.success == true) {
            $('.jq_confirmpassword').modal('show');
            $(".jq_confirmpassword").addClass("in");
            $(".jq_confirmpassword").css("display",'block');
           
          } else {
           
            $('.jq_confirmpassword').modal('hide');
            $(".jq_confirmpassword").removeClass("in");
            $(".jq_confirmpassword").css("display",'none');
           // let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
              setTimeout(()=>{
                this.router.navigate(['/']);
              });
        }
        });
      
    }
  
     

    this.buildForm();
    const url = 'users/get';
    this.user_id=localStorage.getItem('user_id');
    this.artist.getBuyerData(url, this.user_id).subscribe((responsse: any) => {
   console.log(responsse);
      if (responsse.success == true) {
       
       this.base64Image =responsse.result.image_url;
       this.user_first_name =responsse.result.firstname; 
      
      } else {

      }
    });
    const subject_url="arts/get-art-subjects";
   
    this.Uploadart.getArtSubjectData(subject_url).subscribe((responsse: any) => {
     
      if (responsse.success == true) {
        this.SubjectList = responsse.result  
        this.sub_len=<number>this.SubjectList.length;
      }
    });
    const genre_url="arts/get-art-genres";
    this.Uploadart.getArtGenreData(genre_url).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.GenreList = responsse.result   
        this.gen_len=<number>this.GenreList.length;   
      }
    });
    const medium_url="arts/get-art-mediums";
    this.Uploadart.getArtMediumData(medium_url).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.MediumList = responsse.result  
        this.medium_len=<number>this.MediumList.length;    
      }
    });
    const mood_url="arts/get-art-moods";
    this.Uploadart.getArtMoodData(mood_url).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.MoodList = responsse.result  
        this.mood_len=<number>this.MoodList.length;    
      }
    });
  }
  public formErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: ""
  };
  public formError = {
            
    email: "Email is already exist",
    
  };
  public loginformErrors = {
    email: "",
    password: "",
    
  };
  modalMode = {
    open: 1,
    close: 0
  };
  modalType = {
    login: 1,
    register: 2,
    forget: 3
  };
  public forgetformErrors = {
    email: "",
    password: ""
  };
  // public validateformErrors = {
  //   code: ""
  // };

  public confirmationformErrors = {
    password: "",
    confirmpassword: ""
  };
  public feedbackformErrors = {
    name: "",
    email: "",
    feedback_type: "",
    comment: "",
  };


  public register() {

    this.registerLoader = true;
    this.validationmessage = ""; //err.data.message;
    this.validationmessage1 = "";
    // mark all fields as touched
    this.signup.markFormGroupTouched(this.regform);

    if (this.regform.valid) {
      const first_name = this.regform.value.firstName;
      const Last_name = this.regform.value.lastName;
      const password = this.regform.value.password;
      const email = this.regform.value.email;
      const confirmPass = this.regform.value.confirmpassword;
      const url ='users/signup';
      this.signup.register(first_name,Last_name,password,email,confirmPass,url).subscribe((responsse:any)=>{
       
				if(responsse.success == true){
          this.registerLoader = false;
          //this.toastr.success(responsse.msg);
          this.registerpanel = false;
         
          //this.registercontent1 = "Verify your email";
          //this.registercontent2 = "";
          this.regform.reset();
          let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl||'/register-success']);
          $("#register-modal").modal("hide"); 
				}else{
          this.validationmessage = responsse.msg;
         
          this.registerLoader = false;
          this.toastr.error(responsse.msg);
				}
			});
    } else {

      this.formErrors = this.signup.validateForm(
        this.regform,
        this.formErrors,
        false
      );
    }
  }
  get getLoginFields(){
    return this.loginform.controls;
  }
  login() {
    this.validationmessage='';
    this.LoginLoader = true;
    this.signup.markFormGroupTouched(this.loginform);
    if (this.loginform.valid) {
      const email = this.loginform.value.email;
      const password = this.loginform.value.password;
      const url ='users/login';
      this.Login.login(email,password,url).subscribe((res:any)=>{
    console.log(res);
				if(res.success == true){
          localStorage.setItem('email',email);
          localStorage.setItem('user_id',res.result.user_id);
          localStorage.setItem('role',res.result.role);
          localStorage.setItem('token',res.result.access_token);
          let token = localStorage.getItem('token');
          
          this.LoginLoader = false;
          //this.toastr.success(res.msg);
             
          // let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
          $("#login-modal").modal("hide");
          if(res.result.u_type==1){
          
            this.router.navigate(['/thanku-registration']);
            $('html, body').animate({
              scrollTop: $("#myDiv").offset().top
      }, 1000);
          }else{
          
          this.router.navigate(['/']);
          $('html, body').animate({
            scrollTop: $("#myDiv").offset().top
    }, 1000);
        }
         
                
				}else{
          this.validationmessage=res.msg;
          this.LoginLoader = false;
          this.toastr.error(res.msg);
				}
			});
 
    } else {
      this.LoginLoader = false;
      this.loginformErrors = this.signup.validateForm(
        this.loginform,
        this.loginformErrors,
        false
      );
      
    }
  }
  private checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmpassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
  public buildForm() {
    this.regform = this.form.group(
      {
        firstName: [
          "",
          [Validators.required]
        ],
        lastName: [
          "",
          [Validators.required]
        ],
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.compose([Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@[#\$%\^{},\*])(?=.{9,})/)])],
        confirmpassword: ["", [Validators.required]],
        group1:["", [Validators.required]],
        regUserType: ["collector_members", [Validators.required]]
      },
      { validator: this.checkPasswords }
    );
    this.loginform = this.form.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
    this.forgetform = this.form.group({
      email: ["", [Validators.required, Validators.email]]
    });
    this.confirmpasswordform = this.form.group({
    
      password: ["", Validators.compose([Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@[#\$%\^{},\*])(?=.{9,})/)])],
      confirmpassword: ["", [Validators.required]]
    },{ validator: this.checkPasswords });
    this.feedbackForm=this.form.group({
      name: ["",[Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      feedback_type: ["", [Validators.required]],
      comment: ["", [Validators.required]],
    });
  }
  get f() {
    return this.regform.controls;
  }
  get feedback() {
    return this.feedbackForm.controls;
  }
   
//feedback Form Validation
public getFeedbackData() {
  this.FeedbackLoader = true;
    this.validationmessage = ""; 
   
    this.feedbackService.markFormGroupTouched(this.feedbackForm);

    if (this.feedbackForm.valid) {

      const feedback_url ='users/feedback';
      this.feedbackService.saveFeedback(this.feedbackForm.value,feedback_url).subscribe((responsse:any)=>{
       
				if(responsse.success == true){
          this.FeedbackLoader = false;
          this.feedbackForm.reset();
          this.toastr.success(responsse.msg);
          $(".jq_collapse").slideToggle("slow");
          this.router.navigate(['/']);
          $('html, body').animate({
            scrollTop: $("#myDiv").offset().top
    }, 1000);
        
				}else{
          this.validationmessage = responsse.msg;
          this.FeedbackLoader = false;
          this.toastr.error(responsse.msg);
				}
			});
    } else {

      this.feedbackformErrors = this.feedbackService.validateForm(
        this.feedbackForm,
        this.feedbackformErrors,
        false
      );
    }

}
  modelPopup(mode, type) {
    this.validationmessage = ""; //err.data.message;
    this.validationmessage1 = "";
   
    if (mode == this.modalMode.open && type == this.modalType.login) {
      $("#login-modal").modal("show");
      $("#forget-modal").modal("hide");
      $("#register-modal").modal("hide");
    } else if (mode == this.modalMode.close && type == this.modalType.login) {
      $("#login-modal").modal("hide");
    }
    if (mode == this.modalMode.open && type == this.modalType.forget) {
      $("#login-modal").modal("hide");
      $("#forget-modal").modal("show");
    } else if (mode == this.modalMode.close && type == this.modalType.forget) {
      $("#forget-modal").modal("hide");
    }
    if (mode == this.modalMode.open && type == this.modalType.register) {
     
      $("#login-modal").modal("hide");
      $("#forget-modal").modal("hide");
      $("#register-modal").modal("show");
    } else if (mode == this.modalMode.close && type == this.modalType.register) {
      $("#register-modal").modal("hide");
    }
  }
  openFeedBackFrm() {
    $(".jq_card_header").toggleClass("active");
    $(".jq_collapse").slideToggle("slow");
  }
  openSearchBox(){
    $(".jq-search-sec").toggleClass("open");
  }

  user_id ='';
  
  nextstep(){
    let role = localStorage.getItem('role');
  
    if(role=="member"){
      
      let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl||'/sellart']);
    }else if(role=="artist"){
    
      const art_work_url ='arts/get-user-arts';
      this.user_id =localStorage.getItem('user_id');
      this.sellart.getArtData(this.user_id,art_work_url).subscribe((responsse: any) => {
        //console.log(responsse);
        if (responsse.success == true) {
            
          
            if(responsse.result.length>0){
              let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
              this.router.navigate([returnUrl||'/uploaded-arts']);
            }
        }else{
          let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl||'/upload-art']);
        }
      });
    }else{
    
      let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl||'/sellart']);

    }
  }

  get fgp() {
    return this.forgetform.controls;
  }
  get resetpass() {
    return this.confirmpasswordform.controls;
  }
  forgetpassword() {
    this.forgotPassLoader = true;
    this.signup.markFormGroupTouched(this.forgetform);
    if (this.forgetform.valid) {
      const url ='users/forgot-password';
      this.signup.forgetpassword(url,this.forgetform.value.email).subscribe((responsse:any)=>{
       console.log(responsse);
				if(responsse.success == true){
          this.forgotPassLoader = false;
          $("#forget-modal").modal("hide");
          this.toastr.success(responsse.authMessage);
         // $("#confirmpassword-modal").modal("show");
				}else{
          this.forgotPassLoader = false;
         this.validationmessage = responsse.authMessage;
         this.toastr.error(responsse.authMessage);
				}
			});
    
    } else {
      this.forgotPassLoader = false;
      this.forgetformErrors = this.signup.validateForm(
        this.forgetform,
        this.forgetformErrors,
        false
      );
    }
  }

  confirmnewpassword() {
    this.confirmPassLoader=true;
    this.signup.markFormGroupTouched(this.confirmpasswordform);
    this.confirmPassLoader=false;
    if (this.confirmpasswordform.valid) {
      const url="users/reset-password";
      this.route.queryParams.subscribe(params => {
        this.code = params['verification_code']
       
      });
      this.signup.resetPassword(url,this.confirmpasswordform.value, this.code).subscribe((responsse:any)=>{
       
				if(responsse.success == true){
          this.confirmPassLoader = false;
          $("#confirmpassword-modal").modal("hide");
          this.toastr.success(responsse.authMessage);
          setTimeout(()=>{
            this.router.navigate(['/']);
          });
				}else{
          this.confirmPassLoader = false;
         this.validationmessage =responsse.msg;
         this.toastr.success(responsse.authMessage);
				}
      });
      
    } else {
      this.confirmationformErrors = this.signup.validateForm(
        this.confirmpasswordform,
        this.confirmationformErrors,
        false
      );
    
    }
  }
  onKey(e){
    if(e.keyCode==13){
     let search_value=e.target.value;  
      localStorage.setItem("filter_value",search_value);
      this.router.navigate(['/searching-results']);
   }
  }
}
