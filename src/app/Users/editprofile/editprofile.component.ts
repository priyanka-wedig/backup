import { Component, OnInit } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArtistService } from 'src/app/Shared/services/artist/artist.service';
import { MyprofileService } from '../services/myprofile/myprofile.service';
import { ArtistProfileService } from 'src/app/Shared/services/artist-profile/artist-profile.service';
declare var $ : any;

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  saveProfileLoader:boolean=false;
  profileLoader=false
  picSelected=false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  public personalform:FormGroup;
  public generalform:FormGroup;
  public deliveryform:FormGroup;
  public accountform:FormGroup;
  public notificationform:FormGroup;
  notificationOpts:any = [
    { name: 'Marketing Messages',  selected: true, id: 0 },
    { name: 'Brand Notifications',  selected: false, id: 1 },
    { name: 'Stock Notifications',  selected: false, id: 2 },
  ]
  updateInfo_Type={
    personal:'personal',
    General:'general',
    DeliveryAddress:'DeliveryAddress',
    Account:'account',
    Notification:'notification',
    avatar:'avatar',
    header_image:'header_image',
    all:'all',
    add_new:'add_new',
    update:'update',
    delete:'delete'
  }
  notificationOptsSeledted=[false,false,false];
  full_name: string;
  user_id: string;
  firstName: string;
  lastName: any;
  
  countries=[];
  states=[];
  cities=[];
  genderOption=[    
    {    
      "Id": 'male',    
      "Name": "Male"    
    },    
    {    
      "Id": 'female',    
      "Name": "Female"    
    }, 
  ]; 
  base64Image: string="";
  accesstype=0;
  mobileNo: any;
  Inspiration: any;
  Education: any;
  about: any;
  ZipCode: any;
  Address: any;
  country: "";
  city: "";
  state: "";
  genders:'';
  backgroundimageChangedEvent: any='';
  backgroundCroppedImage: any='';
  backgroundBase64Image: any='';
  backgroundPicSelected: boolean=false;
  background_image_type: any;
  Username: '';
  CountryName: any;
  CityName: any;
  followersCount: any;
  followingCount: any;
  constructor(public artist:ArtistService,private imagecropper:ImageCropperModule, public form: FormBuilder,private router:Router, private toastr: ToastrService,public myprofile:MyprofileService,public ArtistProfile:ArtistProfileService) {  
    }
  
    ngOnInit() {
     

      const url = 'users/get';
      this.user_id = localStorage.getItem('user_id');
      const count_url = 'users/count-follow';
      this.ArtistProfile.getArtistFollowersCount(count_url,this.user_id,null).subscribe((responsse: any) => {
        console.log(responsse);
        if (responsse.success == true) {
          
            this.followersCount=responsse.count.followers;
            this.followingCount=responsse.count.following;
      
         
        } else {
  
        }
      });
      this.artist.getBuyerData(url, this.user_id).subscribe((responsse: any) => {
       console.log(responsse);
        if (responsse.success == true) {
          this.base64Image =responsse.result.image_url; 
          this.backgroundBase64Image=responsse.result.header_image_url;
          this.firstName =responsse.result.firstname 
          this.lastName =responsse.result.lastname;
          this.mobileNo=responsse.result.mobile;
          this.genders=responsse.result.gender;
          this.Username=responsse.result.username;
          this.CountryName=responsse.result.country_name;
          this.CityName=responsse.result.city_name;
          this.personalform =  this.form.group({
            firstname:  this.firstName,
            lastname: this.lastName,
            mobile: this.mobileNo,
            gender:this.genders,
          });
          this.notificationOptsSeledted[0]=responsse.result.marketing_notifications !="" ? responsse.result.marketing_notifications:false;
            this.notificationOptsSeledted[1]=responsse.result.brand_notifications!=""?responsse.result.brand_notifications:false;
            this.notificationOptsSeledted[2]=responsse.result.stock_notifications!=""?responsse.result.brand_notifications:false;
            this.notificationform = this.form.group({
              //Username:  this.Username,
              notificationOpts:this.form.array(this.notificationOptsSeledted)
            });
          this.country=responsse.result.country_id;
          this.state=responsse.result.state_id;
          this.city=responsse.result.city_name;
          //
         this.Inspiration=responsse.result.inspiration;
         this.Education=responsse.result.education;
         this.about=responsse.result.about;
         this.ZipCode=responsse.result.ZipCode;
         this.Address=responsse.result.address_1;
         this.getAvailableState(this.country);
         //this.getAvailableCity(this.state);
         this.deliveryform =  this.form.group({Country:this.country,
           City:this.city,
           State:this.state,
           ZipCode:this.ZipCode,
           Address: this.Address});
        } else {
  
        }
      });
      
      this.buildForm();
      
     this.getAvailableCountry();
      
    }
    public buildForm() {
      
      this.personalform =  this.form.group({
        firstname: [''],
        lastname: [''],
        mobile: [''],
        gender:[''],
      });
      this.generalform = this.form.group({
        inspiration:'',
        education:'',
        about:''
      });
      this.deliveryform = this.form.group({
        Country:[],
        City:[],
        State:[],
        ZipCode:'',
        Address:''
      });
      this.accountform = this.form.group({
        Username:'',
        newPassword:'',
        confirmPassword:''
      });
      this.notificationform = this.form.group({
        //Username:'',
        notificationOpts:this.form.array(this.notificationOptsSeledted)
      });
    }
  
    getAvailableCountry(){
       const country_url = 'users/get-countries';  
      this.artist.getCountryData(country_url).subscribe((responsse: any) => {
        if (responsse.success == true) {
          this.countries = responsse.result      
        }else{
          this.countries=[];
        }
      });
    }
    getAvailableState(event){
      
    
      const state_url='users/get-states';
      this.artist.getStateData(state_url,event).subscribe((responsse: any) => {
        if (responsse.success == true) {
          this.states = responsse.result  
        
        }else{
          this.states=[];
          this.cities=[];
        }
      });
    }
    getAvailableCity(event){
     
      const city_url='users/get-cities';
      this.artist.getCityData(city_url,event).subscribe((responsse: any) => {
        if (responsse.success == true) {
          this.cities = responsse.result  
              
        }else{
          this.cities=[];
        }
      });
    }
    get formData() { return <FormArray>this.notificationform.get('notificationOpts'); }
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;  
    }  
    image_type="";
    clearImageCropper(){
      this.imageChangedEvent = []; 
      this.croppedImage = "";
      this.base64Image="";
      this.picSelected=false;
      $('#image-crop-modal').modal('hide'); 
    }
    saveCropppedImage(){
      this.profileLoader=true;

      this.saveMyImage(this.base64Image,this.image_type);
  
     }
     imageCropped(event: any) {
     
      this.croppedImage = event.file;
      this.base64Image=event.base64;
      this.image_type=event.file['type'];
    }

    imageLoaded() {
      console.log(new Date().getTime())
      console.log(new Date().valueOf())
      this.picSelected=true;
     
    }
    openPopUp(){
      $('#image-crop-modal').modal('show')
    }
    openBackgroungPopUp(){
      $('#header-image-crop-modal').modal('show')
    }
    loadImageFailed() {
      this.toastr.error('Your photo is not properly loaded')
    }
    image_path="";
    type="";
    saveMyImage(cropped_image,type){
      this.profileLoader=false;
      $('#image-crop-modal').modal('hide'); 
      this.image_path=cropped_image;
      this.type=type;
      const image_url="users/upload-photo";
      this.myprofile.updateUserImageFunction(image_url,this.image_path,this.type,this.user_id,new Date().getTime()).subscribe((responsse: any) => {
        console.log(responsse);
        if (responsse.success == true) {
          this.toastr.success('Personal form saved succesfully', '');
          this.saveProfileLoader=false;
        }
      });
    }
    updateUserProfile='users/update-user-profile';
    body={
      user_id:'',
      action_type:'',
      info_update_type:'',
      ip_address:'', 
      device_platform_type:'',
      app_version:'',
      user_role_type:'',
      artist_profile_status:' ',
      curator_profile_status:'',
      buyer_profile_status:'',
      sign_up_type:'',
      sign_up_device_type:'',
      sign_up_app_version:'',
      marketing_notifications:'',
      brand_notifications:'',
      stock_notifications:'',
      username:'',
      mobile:'',
      gender:'',
      birthdate:'', 
      education:'',
      inspiration:'',
      avatar:'',
      about:'',
      country_id:'',
      city_name:'',
      state_id:'',
      zip_code:'',
      address_1:'',
      firstname:'',
      lastname:''
    }
    saveProfile(event,infoType)
    {
     
      this.saveProfileLoader=true;
      this.accesstype=0;
      this.body.user_id=localStorage.getItem('user_id');
      const firstname = this.personalform.value.firstname;
      const lastname = this.personalform.value.lastname;
      const mobile = this.personalform.value.mobile;
      const gender = this.personalform.value.gender;
      this.body.mobile=mobile;
      this.body.gender=gender;
      this.body.firstname=firstname;
      this.body.lastname=lastname;

      const Inspiration = this.generalform.value.inspiration;
      const Education = this.generalform.value.education;
      const about = this.generalform.value.about;
      this.body.inspiration=Inspiration;
      this.body.education=Education;
      this.body.about=about;

      const Country = this.deliveryform.value.Country;
        const City = this.deliveryform.value.City;
        const State = this.deliveryform.value.State;
        const zipCode = this.deliveryform.value.ZipCode;
        const Address = this.deliveryform.value.Address;
    
        this.body.country_id=Country;
        this.body.city_name=City;
        this.body.state_id=State;
        this.body.zip_code=zipCode;
        this.body.address_1=Address;

        const MarketingMessages = this.notificationform.value.MarketingMessages;
        const BrandNotifications = this.notificationform.value.BrandNotifications;
        const StockNotifications = this.notificationform.value.StockNotifications;
        this.body.marketing_notifications=this.notificationform.value.notificationOpts[0];
        this.body.brand_notifications=this.notificationform.value.notificationOpts[1];
        this.body.stock_notifications=this.notificationform.value.notificationOpts[2];
        
      if(infoType==this.updateInfo_Type.personal)
      {
       
        this.body.info_update_type=infoType;
       
       
        this.myprofile.updateUserPostFunction(this.updateUserProfile,this.accesstype,this.body).subscribe((responsse: any) => {
          console.log(responsse);
          if (responsse.success == true) {
            this.toastr.success('Personal information saved succesfully', '');
            this.saveProfileLoader=false;
            this.router.navigate(['/my-profile']);
              $('html, body').animate({
                scrollTop: $("#myDiv").offset().top
        }, 1000);
          }
        });
       
      
      }
      if(infoType==this.updateInfo_Type.General)
      {
        this.body.info_update_type=infoType;
       
        this.myprofile.updateUserPostFunction(this.updateUserProfile,this.accesstype,this.body).subscribe((responsse: any) => {
          console.log(responsse);
          if (responsse.success == true) {
        
        this.toastr.success('General form saved succesfully', '');
        this.saveProfileLoader=false;
        this.router.navigate(['/my-profile']);
        $('html, body').animate({
          scrollTop: $("#myDiv").offset().top
  }, 1000);
          }
      });
      }
      if(infoType==this.updateInfo_Type.DeliveryAddress)
      {
        this.body.info_update_type=infoType;
        this.body.action_type=this.updateInfo_Type.add_new;
        
       console.log(this.body);
        this.myprofile.updateUserPostFunction(this.updateUserProfile,this.accesstype,this.body).subscribe((responsse: any) => {
          console.log(responsse);
       
        console.log(responsse);
        if (responsse.success == true) {
          this.toastr.success('Delivery address saved succesfully', '');
          this.saveProfileLoader=false;
          this.router.navigate(['/my-profile']);
          $('html, body').animate({
            scrollTop: $("#myDiv").offset().top
    }, 1000);
        }});
     
      }
      if(infoType==this.updateInfo_Type.Account)
      {
       /*  console.log(this.accountform.value); */
        this.body.info_update_type=infoType;
        // const Username = this.accountform.value.Username;
        // const newPassword = this.accountform.value.newPassword;
        // const confirmPassword = this.accountform.value.confirmPassword;
      }
      if(infoType==this.updateInfo_Type.Notification)
      {
        this.body.info_update_type=infoType;
       
        // const Username = this.notificationform.value.Username;
        // this.body.username=Username;
        this.myprofile.updateUserPostFunction(this.updateUserProfile,this.accesstype,this.body).subscribe((responsse: any) => {
          console.log(responsse);
          if (responsse.success == true) {
        this.toastr.success('Notificaion saved succesfully', '');
        this.saveProfileLoader=false;
        this.router.navigate(['/my-profile']);
        $('html, body').animate({
          scrollTop: $("#myDiv").offset().top
  }, 1000);
          }});
      }
      if(infoType==this.updateInfo_Type.avatar)
      {
        this.body.info_update_type=infoType;
        this.body.avatar='image'
      }
    }
    clearBackgroundImageCropper(){
      this.backgroundimageChangedEvent = []; 
      this.backgroundCroppedImage = "";
      this.backgroundBase64Image="";
      this.backgroundPicSelected=false;
      $('#header-image-crop-modal').modal('hide'); 
    }
    backgroundFileChangeEvent(event: any): void {
      this.backgroundimageChangedEvent = event;  
  }  
  backgroundImageCropped(event: any) {
     
    this.backgroundCroppedImage = event.file;
    this.backgroundBase64Image=event.base64;
    this.background_image_type=event.file['type'];
  }

  backgroundImageLoaded() {
    console.log(new Date().getTime())
    console.log(new Date().valueOf())
    this.backgroundPicSelected=true;
   
  }
  saveBackgroundCropppedImage(){
    this.profileLoader=true;

    this.saveBackgroundMyImage(this.backgroundBase64Image,this.background_image_type);

   }
   saveBackgroundMyImage(cropped_image,type){
    this.profileLoader=false;
    $('#header-image-crop-modal').modal('hide'); 
    this.image_path=cropped_image;
    console.log(this.image_path);
 
    this.type=type;
    this.saveProfileLoader=true;
    const image_url="users/upload-backgroud-photo";
    this.myprofile.updateUserImageFunction(image_url,this.image_path,this.type,this.user_id,new Date().getTime()).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.authCode == true) {
        //this.toastr.success('Personal form saved succesfully', '');
        this.saveProfileLoader=false;
      }
    });
  }

}
