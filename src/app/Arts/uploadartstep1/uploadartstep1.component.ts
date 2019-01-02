import { Component, OnInit, ɵConsole } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { ArtdetailsService } from 'src/app/Shared/services/artdetails/artdetails.service';
declare var $ : any;

@Component({
  selector: 'app-uploadartstep1',
  templateUrl: './uploadartstep1.component.html',
  styleUrls: ['./uploadartstep1.component.css']
})
export class Uploadartstep1Component implements OnInit {
  url="";
  selectedFile: Array<File>;
  file_name:'';
  file_size:any;
  artistLoader:boolean=false;
  validationMessage="";
  imageChangedEvent: any = '';
  croppedImage: any = '';
  file_type:any="";
  art_id:'';
  artistArtDetail: any;
  art_url:'';
  back_image: string="";

  constructor(public route:ActivatedRoute,private router:Router,public ArtDetail:ArtdetailsService) { }

  ngOnInit() {
    this.art_id = this.route.snapshot.params["id"];
  localStorage.setItem('art_id',this.art_id);
    if(this.art_id !="" && this.art_id != undefined){
    const artist_detail_url="arts/art-details";
    this.ArtDetail.getArtDetailsData(artist_detail_url,this.art_id).subscribe((responsse: any) => {
      console.log(responsse);
      
       if (responsse.success == true) {
       this.artistArtDetail = responsse.result[0];
       this.art_url=this.artistArtDetail.art_url;
       this.file_size=this.art_id;
     
       localStorage.setItem('artistArtDetail',JSON.stringify(this.artistArtDetail));
       localStorage.setItem('image_path',this.art_url);
  
      }else{
        this.artistArtDetail='';
      }
    });
  }

  //back to first step
  if((this.art_id =="" || this.art_id == undefined) &&  (localStorage.getItem('image_path') !='' && localStorage.getItem('image_path') !=undefined) ){
    this.back_image=localStorage.getItem('image_path');
    this.file_size=localStorage.getItem('file_size');
  

  
    }
}
  
  onSelectFile(event) { // called each time file input changes
    this.imageChangedEvent= event;
    console.log(this.imageChangedEvent);
    localStorage.setItem('imageChangedEvent',JSON.stringify(this.imageChangedEvent));
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
        
        this.url = event.target.result;
        localStorage.setItem('original_image', this.url);
        console.log(this.url);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    this.selectedFile = event.target.files[0];
    this.file_name=this.selectedFile['name'];
    localStorage.setItem('file_name', this.file_name);
    this.file_size=this.selectedFile['size'];
    localStorage.setItem('file_size', this.file_size);
    this.file_type=this.selectedFile['type'];
    }
    
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      localStorage.setItem('image_path', this.croppedImage);
  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
  }
  uploadartstep2(file_size){
   
    this. artistLoader =true;
    if(file_size ==undefined || file_size=="" || file_size=="undefined" ){
      this. artistLoader =false;
       this.validationMessage="Art Picture Can't be blank";
     }else{
       this.validationMessage="";
       this. artistLoader =false;
       let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
       this.router.navigate([returnUrl||'/review-art']);
       $('html, body').animate({
        scrollTop: $("#myDiv").offset().top
}, 1000);
     }
  }
  remove(){
    this.croppedImage ="";
    this.url="";
    this.file_size="";
    this.file_name='';
    localStorage.setItem('image_path','');
    localStorage.setItem('file_name','');
    localStorage.setItem('file_size', '');
    // let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
    // this.router.navigate([returnUrl||'/upload-art']);
  }
  remove_art_image(){
    this.art_url="";
    this.url="";
    this.file_size="";
    this.file_name='';
    localStorage.setItem('image_path','');
    localStorage.setItem('file_name','');
    localStorage.setItem('file_size', '');

  }
  remove_back_art_image(){
    this.art_url="";
    this.url="";
    this.back_image="";
    this.file_size="";
    this.file_name='';
    localStorage.setItem('image_path','');
    localStorage.setItem('file_size', '');
    localStorage.setItem('file_name','');
  }
}
