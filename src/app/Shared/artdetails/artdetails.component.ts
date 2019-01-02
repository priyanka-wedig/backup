import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from "@angular/forms";
import { ArtistProfileService } from '../services/artist-profile/artist-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtdetailsService } from '../services/artdetails/artdetails.service';
import { Meta } from '@angular/platform-browser';
import { MetaService } from '@ngx-meta/core';
import { AuthService } from '../services/authService/auth.service';
import {ShareButtonsModule} from 'ngx-sharebuttons';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-artdetails',
  templateUrl: './artdetails.component.html',
  styleUrls: ['./artdetails.component.css']
})
export class ArtdetailsComponent implements OnInit {
  userId:any="";
  artId=""
  artistArt='';
  artistArtDetail:any;
  artist_length:number=0;
  height="";
  width="";
  depth="";
  image="";
  audio_url="";
  video_url="";
  art_url="";
  title="";
  first_name="";
  last_name="";
  subject='';
  genre="";
  mood="";
  medium="";
  description="";
  art_id ="";
  token_user_id="";
  price="";
  public reportType:Array<Object> = [
    {id: 'size_issue', text: 'Art Size Issue'},
    {id: 'false_reviews', text: 'False Reviews'},
    {id: 'unauthorized_sales', text: 'Unauthorized sales'},
    
  ];
  public reportErrors = {
    report_type: "",
    user_name:"",
    description:'',
    
    
    
  };
  public reportForm: FormGroup;
  reportLoader: boolean=false;
  like_data: number;
  count: any;

  constructor(public route:ActivatedRoute,public ArtistProfile:ArtistProfileService,public ArtDetail:ArtdetailsService,private meta: Meta,public auth:AuthService,private readonly metatag: MetaService,public router:Router,public form: FormBuilder,public toastr: ToastrService ) {
   }
  ngOnInit() {
    this.artId=this.route.snapshot.params["id"];
    localStorage.setItem('art_id',this.artId);
    this.artDetailArtsData(this.artId);
    this.token_user_id=localStorage.getItem('user_id');


    this.reportForm = this.form.group(
      {
        report_type: ["",[Validators.required]],
        user_name: ["",[Validators.required]],
        description: ["",[Validators.required]],
       
      }
       
    );
   //this.userId = this.route.snapshot.params["id"];
   const get_like_art_url ='arts/get-likes';
   this.ArtDetail.getlikeArt(get_like_art_url,this.artId,this.token_user_id).subscribe((responsse:any)=>{
    console.log(responsse);
    if(responsse.success == true){
      if(responsse.params=="Liked"){
        this.like_data=1;
        this.count=responsse.count;
      }else{
        this.like_data=0;
        this.count=responsse.count;
      }
     
    }else{
      if(responsse.params=="Liked"){
        this.like_data=1;
        this.count=responsse.count;
      }else{
        this.like_data=0;
        this.count=responsse.count;
      }
    }
  });
 
  }
  get reports_form(){
    return this.reportForm.controls;
  }
  
  public report() {

    this.reportLoader = true;
    this.ArtDetail.markFormGroupTouched(this.reportForm);
    if (this.reportForm.valid) {

      const report_type = this.reportForm.value.report_type;
      const user_name = this.reportForm.value.user_name;
      const description = this.reportForm.value.description;
    
      const url ='users/report_save';
      this.ArtDetail.report(report_type,this.art_id,user_name,description,url).subscribe((responsse:any)=>{
        
        if(responsse.success == true){
          this.reportLoader = false;
          $("#artReport").modal("hide"); 
          this.toastr.success(responsse.msg);
				}else{
          this.toastr.error(responsse.msg);
        }
      });
    } else {
     

    }
  }
  public onFollow(){

    const url ='arts/likes';
    this.ArtDetail.likeArt(url,this.artId,this.token_user_id).subscribe((responsse:any)=>{
      
      if(responsse.success == true){
        console.log(responsse);
        if(responsse.msg=="User liked successfully."){
          this.like_data=1;
          this.count=responsse.count;
        }else{
          this.like_data=0;
          this.count=responsse.count;
        }
       
      }else{
        
      }
    });
  } 
  public onFavourite(artIds) {

    const url = 'arts/likes';
    this.ArtDetail.likeArt(url, artIds, this.token_user_id).subscribe((responsse: any) => {

      if (responsse.success == true) {
        console.log(responsse);
        if (responsse.msg == "User liked successfully.") {
          this.artDetailArtsData(this.artId);

        } else {
          this.artDetailArtsData(this.artId);

        }

      } else {
        if (responsse.msg == "User liked successfully.") {
          this.artDetailArtsData(this.artId);

        } else {
          this.artDetailArtsData(this.artId);

        }
      }
    });
  }
 public artDetailArtsData(artId){
  const artist_detail_url="arts/art-details";
  const artist_art_url="arts/get-user-arts_sale";
  this.ArtDetail.getArtDetailsData(artist_detail_url,artId).subscribe((responsse: any) => {
    console.log(responsse);
    
     if (responsse.success == true) {
     this.artistArtDetail = responsse.result[0];
     this.userId=responsse.result[0].user_id;
     this.price=responsse.result[0].price;
     this.image=responsse.result[0].user_url;
     this.audio_url=responsse.result[0].audio_url;
     this.video_url=responsse.result[0].video_url;
     this.art_url=responsse.result[0].art_url;
     this.title=responsse.result[0].title;
     this.description=responsse.result[0].description;
     this.art_id=responsse.result[0].id;


     this.first_name=responsse.result[0].first_name;
     this.last_name=responsse.result[0].last_name;
     

     this.subject=responsse.result[0].subject;
     this.genre=responsse.result[0].genre;
     this.mood=responsse.result[0].mood;
     this.medium=responsse.result[0].medium;

     var strArr =  this.artistArtDetail['art_size'].split('x');
     this.height=strArr[0];
     this.width=strArr[1];
     this.depth=strArr[2];
    //  this.meta.addTag({ property: 'og:title', content:  this.artistArtDetail['title'] },true);
    //  this.meta.addTag({ property: 'og:image', content:  this.artistArtDetail['art_url'] },true);
    //  this.meta.addTag({ property: 'og:description', content:  this.artistArtDetail['description'] },true);
    
    this.metatag.setTag('og:image', this.artistArtDetail['title']);
    this.metatag.setTag('og:image', this.artistArtDetail['art_url']);
    this.metatag.setTag('og:description', this.artistArtDetail['description']);

     this.ArtistProfile.getArtistSaleArtData(artist_art_url,this.userId,artId).subscribe((res: any) => {
      console.log(res);
      if (res.success == true) {
       this.artistArt = res.result;
        
        this.artist_length=<number>this.artistArt.length; 
       

       }else{
         this.artistArt='';
      }
     });
    }else{
      this.artistArtDetail='';
    }
  
  });
 }
  
}
