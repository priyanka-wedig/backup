import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ArtistService } from "../../Shared/services/artist/artist.service";
import { Observable } from 'rxjs/Rx';
import { promise } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import  {Router, ActivatedRoute} from '@angular/router';


declare var $: any;


@Component({
  selector: 'app-artistsregister',
  templateUrl: './artistsregister.component.html',
  styleUrls: ['./artistsregister.component.css']
})
export class ArtistsregisterComponent implements OnInit {

  constructor(public form: FormBuilder, public artist: ArtistService,public toastr:ToastrService,public route:ActivatedRoute,
    private router:Router) { }
  user_id = "";
  CountryList: Array<any>;
  StateList: Array<any>;
  CityList: Array<any>;
  public artistform: FormGroup;
  artistLoader: boolean = false;

  public artistformErrors = {
   
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    address: "",
    ZipCode: "",
    State: "",
    Country: "",
    City: "",
    group1:""
    
  };
  public formErrors = {
   
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    address: "",
    ZipCode: "",
    State: "",
    Country: "",
    City: "",
    group1:"",
    confirmpassword:'',
    password:''
    
  };
  formFields= {
    firstname: [
      "",
      [Validators.required]
    ],
    lastname: [
      "",
      [Validators.required]
    ],
    password: ["", Validators.compose([Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@[#\$%\^{},\*])(?=.{9,})/)])],
    confirmpassword: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    mobile: ["", [Validators.required]],
    address: ["", [Validators.required]],
    ZipCode: ["", [Validators.required]],
    State: ["", [Validators.required]],
    Country: ["", [Validators.required]],
    City: ["", [Validators.required]],
    group1:["", [Validators.required]],

  };
  checkpassw=
    { validator: this.checkPasswords };
  
  signUpFields= {
    firstname: [
      "",
      [Validators.required]
    ],
    lastname: [
      "",
      [Validators.required]
    ],
    
    email: ["", [Validators.required, Validators.email]],
    mobile: ["", [Validators.required]],
    address: ["", [Validators.required]],
    ZipCode: ["", [Validators.required]],
    State: ["", [Validators.required]],
    Country: ["", [Validators.required]],
    City: ["", [Validators.required]],
    group1:["", [Validators.required]],

  };
  buildForm(fieldsObject,checkpassw){
    this.artistform = this.form.group(fieldsObject,checkpassw);
  }
  private checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmpassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
  ngOnInit() {

    this.user_id = localStorage.getItem('user_id');
    const url = 'users/get-profile';
    const country_url = 'users/get-countries';  
    this.artist.getBuyerData(url, this.user_id).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
       this.GetState(responsse.result.Country);
      
        // this.GetCity(responsse.result.State);
        responsse.result.State= responsse.result.State;
        responsse.result.City= responsse.result.City;
        this.artistform.setValue(responsse.result);
      } else {
        this.formErrors = {
   
          firstname: "",
          lastname: "",
          email: "",
          mobile: "",
          password:"",
          confirmpassword:"",
          address: "",
          ZipCode: "",
          State: null,
          Country: null,
          City: null,
          group1:""
          
        };
        this.artistform.setValue(this.formErrors);
      }
    });
    this.artist.getCountryData(country_url).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.CountryList = responsse.result      
      }else{
        this.CountryList=[];
      }
    });
  
    if(this.user_id==null){
      this.buildForm(this.formFields,this.checkpassw);
    }else{
      this.buildForm(this.signUpFields,'');
    }

  }
  GetState(event){
    console.log(event);
    const state_url='users/get-states';
    this.artist.getStateData(state_url,event).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.StateList = responsse.result  
      
      }else{
        this.StateList=[];
        this.CityList=[];
      }
    });
  }
  GetCity(event){
    const city_url='users/get-cities';
    this.artist.getCityData(city_url,event).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.CityList = responsse.result  
            
      }else{
        this.CityList=[];
      }
    });
  }
  public artistreg() {

    this.artistLoader = true;

    this.artist.markFormGroupTouched(this.artistform);

    if (this.artistform.valid) {
      const url ='arts/update-user-profile';
      this.user_id=localStorage.getItem('user_id');
      this.artist.artistregister(url,this.artistform.value,this.user_id).subscribe((responsse:any)=>{
       console.log(responsse);
				if(responsse.success == true){
          this.artistLoader = false;
          if(this.user_id !=null){
            localStorage.setItem('role','artist');
          }
          //this.toastr.success(responsse.msg);
          let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl||'/thanku-registration']);
          $('html, body').animate({
            scrollTop: $("#myDiv").offset().top
    }, 1000);
          //$("#registerThanksModal").modal("show");
				}else{
          console.log(responsse.msg);
          this.artistLoader = false;
          this.toastr.error(responsse.msg);
				}
			});

    } else {

      this.artistformErrors = this.artist.validateForm(
        this.artistform,
        this.artistformErrors,
        false
      );
    }
  }
  get f() {
    return this.artistform.controls;
  }
}
