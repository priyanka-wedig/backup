import { Component, OnInit } from '@angular/core';
import  {Router, ActivatedRoute} from '@angular/router';
import { FormBuilder,FormGroup,Validators } from "@angular/forms"; 
import { UploadartService } from "../services/uploadart/uploadart.service";
import { IfStmt } from '@angular/compiler';
declare var $ : any;


@Component({
  selector: 'app-uploadartstep4',
  templateUrl: './uploadartstep4.component.html',
  styleUrls: ['./uploadartstep4.component.css']
})
export class Uploadartstep4Component implements OnInit {
 

  SubjectList: Array<any>;
  GenreList: Array<any>;
  MediumList: Array<any>;
  MoodList: Array<any>;
  getEditArtistData="";
  public uploadArtWorkform: FormGroup;
  uploadArtWorkLoader:boolean=false;
  height: any;
  width: any;
  depth: any;
  getbackArtData: any;
  art_id: string;

  constructor(public form: FormBuilder,public Uploadart:UploadartService,public route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.buildForm();
    this.art_id=localStorage.getItem('art_id');
    const subject_url="arts/get-art-subjects";
    this.Uploadart.getArtSubjectData(subject_url).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.SubjectList = responsse.result      
      }
    });
    const genre_url="arts/get-art-genres";
    this.Uploadart.getArtGenreData(genre_url).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.GenreList = responsse.result      
      }
    });
    const medium_url="arts/get-art-mediums";
    this.Uploadart.getArtMediumData(medium_url).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.MediumList = responsse.result      
      }
    });
    const mood_url="arts/get-art-moods";
    this.Uploadart.getArtMoodData(mood_url).subscribe((responsse: any) => {
      if (responsse.success == true) {
        this.MoodList = responsse.result      
      }
    });
    this.getEditArtistData=JSON.parse(localStorage.getItem('artistArtDetail'));
    console.log(this.getEditArtistData);

    if(this.getEditArtistData !=null){
      var strArr =  this.getEditArtistData['art_size'].split('x');
       this.height=strArr[0];
       this.width=strArr[1];
       this.depth=strArr[2];
       if( this.depth=="undefined"|| this.depth==undefined ||this.depth==null||this.depth=='null'){
        this.depth="";
       }
      this.uploadArtWorkform =  this.form.group({
        height:  this.height,
        width: this.width,
        depth:this.depth,
        subject: this.getEditArtistData['subject_id'],
        genre:this.getEditArtistData['genre_id'],
        medium: this.getEditArtistData['medium_id'],
        mood:this.getEditArtistData['mood_id'],
      });
      const file_name=localStorage.getItem('file_name');
      if(file_name=='' || file_name==undefined || file_name==null){
        localStorage.removeItem('image_path');
      }
      
    }
    this.getbackArtData=JSON.parse(localStorage.getItem('artwork_details'));
    console.log(this.getbackArtData);
    if(this.getbackArtData !=null){
      if( this.depth=="undefined"|| this.depth==undefined ||this.depth==null||this.depth=='null'){
        this.depth="";
       }else{
        this.depth=this.getbackArtData.depth;
       }
      this.uploadArtWorkform =  this.form.group({
        height:  this.getbackArtData.height,
        width: this.getbackArtData.width,
        depth:this.getbackArtData.depth,
        subject: this.getbackArtData.subject,
        genre:this.getbackArtData.genre,
        medium: this.getbackArtData.medium,
        mood:this.getbackArtData.mood,
      });
   }
  }
  public buildForm() {
    if( this.depth=="undefined"|| this.depth==undefined ||this.depth==null||this.depth=='null'){
      this.depth="";
     }
    this.uploadArtWorkform = this.form.group(
      {
      
        height: [ "", [Validators.required]],
        depth: [ ""],
        width: [ "", [Validators.required]],
        subject: [ "", [Validators.required]],
        genre: [ "", [Validators.required]],
        medium: [ "", [Validators.required]],
        mood: [ "", [Validators.required]],
       
      }
    ); 
  }
  get f() {
    return this.uploadArtWorkform.controls;
  }
  
  public uploadArtWork() {
  
    this.uploadArtWorkLoader =true;
   
      
      if (this.uploadArtWorkform.valid) {
        const artwork_details = this.uploadArtWorkform.value;
       
        this.uploadArtWorkLoader =  true;
        localStorage.setItem("artwork_details",JSON.stringify(artwork_details));
       
        let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl||'/additional-media']);
        $('html, body').animate({
          scrollTop: $("#myDiv").offset().top
  }, 1000);
      
          }else{
  
            this.uploadArtWorkLoader =  false;
       
           
        
  
      } 
  }
}
