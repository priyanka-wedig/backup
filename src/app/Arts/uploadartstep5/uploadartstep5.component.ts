import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UploadartService } from "../services/uploadart/uploadart.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const URL = 'http://skeuomodev.indyo.com/api/api/v1/arts/photo';
const AudioURL = 'http://skeuomodev.indyo.com/api/api/v1/arts/audio';
 //const URL = 'http://192.168.1.131:3000/api/v1/arts/photo';
  //const AudioURL = 'http://192.168.1.131:3000/api/v1/arts/audio';
import { FileUploader } from 'ng2-file-upload';
declare var $;
@Component({
  selector: 'app-uploadartstep5',
  templateUrl: './uploadartstep5.component.html',
  styleUrls: ['./uploadartstep5.component.css']
})
export class Uploadartstep5Component implements OnInit {

  public uploadArtWorkform: FormGroup;
  uploadArtWorkLoader: boolean = false;
  video_name: any;
  audio_name: any;
  show_video: any = "";
  show_audio:any="";
  videoLoader: boolean = false;
  audioLoader: boolean = false;
  checkedstatus="checked";
  get_video_url="";
  get_audio_url="";
  art_id="";
  getEditArtistData: any;
  private_gallary=false;


  constructor(public form: FormBuilder, public Uploadart: UploadartService, public toastr: ToastrService, public route: ActivatedRoute,
    private router: Router) { }
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo'});
  
  public uploaderAudio: FileUploader = new FileUploader({ url: AudioURL, itemAlias: 'audio' });

  ngOnInit() {
    
    console.log(this.uploader);
    this.art_id=localStorage.getItem('art_id');
    this.uploader.onBeforeUploadItem = (file)=> { this.videoLoader=true;};

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    console.log(this.uploader.getNotUploadedItems().length);
   
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.videoLoader=false;
      console.log(response);
      localStorage.setItem('video_name', response);
      this.show_video = 'http://skeuomodev.indyo.com/api/data/' +response;
  
      console.log(this.show_video);
      console.log( this.uploader);
    };
    this.uploaderAudio.onBeforeUploadItem = (file)=> { this.audioLoader=true;};
    this.uploaderAudio.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderAudio.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
 
      this.show_audio = 'http://skeuomodev.indyo.com/api/data/' + response;
  
      this.audioLoader=false;
   
      localStorage.setItem('audio_name', response);
      console.log( this.uploader);
    };
    this.getEditArtistData=JSON.parse(localStorage.getItem('artistArtDetail'));
    console.log(this.getEditArtistData);

    if(this.getEditArtistData !=null){
      this.art_id=this.getEditArtistData['id'];
      this.get_video_url=this.getEditArtistData['video_url'];
      localStorage.setItem('video_name', this.get_video_url['art_video']);
      this.get_audio_url=this.getEditArtistData['audio_url'];
      localStorage.setItem('audio_name', this.get_audio_url['art_audio']);
      console.log(this.getEditArtistData['private_gallery']);
      if(this.getEditArtistData['private_gallery']=="no"){
        this.checkedstatus ='';
        this.private_gallary=false;

      }else{
        this.checkedstatus ='checked';
        this.private_gallary=true;

      }
     
    }
  }

  user_id = "";

  videoIframe(){
    setTimeout(()=>{
      $("iframe").attr({'src': this.show_video});
      console.log();
    },1);
    
  }
  videoalreadySavedIframe(){
    setTimeout(()=>{
      $("iframe").attr({'src': this.get_video_url});
      console.log();
    },1);
    
  }
  audioframe(){
    setTimeout(()=>{
      $("iframe").attr({'src': this.show_audio});
      console.log();
    },1);
    
  }
  audioalreadySavedIframe(){
    setTimeout(()=>{
      $("iframe").attr({'src': this.get_audio_url});
      console.log();
    },1);
    
  }

  // onSelectVideo(event) { // called each time file input changes
  //   if (event.target.files && event.target.files[0]) {

  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (event:any) => {

  //       // this.video_url = event.target.result;
  //       // console.log(event);
  //       this.video_url="";

  //   }
  //   console.log(event);
  //   console.log(reader);

  //   }
  //   this.selectedVideo = event.target.files[0];
  //   console.log( this.selectedVideo);


  //  }

  // onSelectAudio(event) { // called each time file input changes
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.onload = (event:any) => {
  //       this.audio_url = event.target.result;
  //       // localStorage.setItem('audio_path', this.audio_url);

  //   }
  //   reader.readAsDataURL(event.target.files[0]);
  //   }
  //   this.selectedAudio = event.target.files[0];
  // }
  public uploadArtWork() {
    this.uploadArtWorkLoader = true;
    const url = 'arts/submit-art-data';
    this.user_id = localStorage.getItem('user_id');
    const upload_url = 'arts/upload';
    const art_data = localStorage.getItem('art_data');
    console.log(art_data);

    const artwork_details = localStorage.getItem('artwork_details');
    console.log(artwork_details);
    const image_name = localStorage.getItem('file_name');
    const image_path = localStorage.getItem('image_path');
    this.private_gallery =JSON.parse(localStorage.getItem('checkedstatus'));
    this.Uploadart.submitArtData(url, JSON.parse(art_data), JSON.parse(artwork_details), this.user_id,this.art_id,this.private_gallery).subscribe((responsse: any) => {
      console.log(responsse);
      if (responsse.success == true) {
        const original_image = localStorage.getItem('original_image');
        this.video_name = localStorage.getItem('video_name');
        this.audio_name = localStorage.getItem('audio_name');
        
        this.Uploadart.UploadImageData(upload_url, image_name, original_image, image_path, responsse.result.insertId, this.audio_name, this.video_name).subscribe((res: any) => {
          console.log(responsse);
          if (res.success == true) {



          }
        });
        localStorage.removeItem('video_name');
        localStorage.removeItem('audio_name');
        localStorage.removeItem('artistArtDetail');
        localStorage.removeItem('image_path');
        localStorage.removeItem('file_name');
        localStorage.removeItem('file_type');
        localStorage.removeItem('art_data');
        localStorage.removeItem('artwork_details');
        localStorage.removeItem('art_id');
        setTimeout(() => {
          this.toastr.success(responsse.msg);
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

          this.uploadArtWorkLoader = false;
    //       this.router.navigate(['my-profile']);
    //       $('html, body').animate({
    //         scrollTop: $("#myDiv").offset().top
    // }, 1000);
    window.location.href="/my-profile";
        }, 7000);

      }
    });


  }
  remove(){
    this.show_video = '';
    this.get_video_url ="";
    localStorage.removeItem('video_name');
  }
  remove_audio(){
    this.show_audio = '';
    this.get_audio_url="";
    localStorage.removeItem('audio_name');
  }
  private_gallery(){
    var flood_checkbox = $('input[type="checkbox"]').is(':checked') ? 'checked' : '';
    this.checkedstatus=flood_checkbox;
    if( this.checkedstatus==""){
     
      this.private_gallary=false;

    }else{
      
      this.private_gallary=true;

    }
    localStorage.setItem('checkedstatus', JSON.stringify(this.checkedstatus));
  }
  
}
