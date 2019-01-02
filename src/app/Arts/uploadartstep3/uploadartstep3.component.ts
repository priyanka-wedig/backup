import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var $ : any;

@Component({
  selector: 'app-uploadartstep3',
  templateUrl: './uploadartstep3.component.html',
  styleUrls: ['./uploadartstep3.component.css']
})
export class Uploadartstep3Component implements OnInit {
  image_path="";
  file_name:any="";
  getEditArtistData="";
  public uploadArtWorkform: FormGroup;
  uploadArtWorkLoader:boolean=false;
  getbackArtData: string;
  public quantitys:Array<Object> = [
    {id: 1, text: '1'},
    {id: 2, text: '2'},
    {id: 3, text: '3'},
    {id: 4, text: '4'},
    {id: 5, text: '5'},
    {id: 6, text: '6'},
    {id: 7, text: '7'},
    {id: 8, text: '8'},
    {id: 9, text: '9'},
    {id: 10, text: '10'},
    {id: 11, text: '11'},
    {id: 12, text: '12'},
    {id: 13, text: '13'},
    {id: 14, text: '14'},
    {id: 15, text: '15'},
    {id: 16, text: '16'},
    {id: 17, text: '17'},
    {id: 18, text: '18'},
    {id: 19, text: '19'},
    {id: 20, text: '20'},
    {id: 21, text: '21'},
    {id: 22, text: '22'},
    {id: 23, text: '23'},
    {id: 24, text: '24'},
    {id: 25, text: '25'},
    {id: 26, text: '26'},
    {id: 27, text: '27'},
    {id: 28, text: '28'},
    {id: 29, text: '29'},
    {id: 20, text: '20'},
  ];
  art_id: string;
  constructor(public form: FormBuilder,public route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.art_id=localStorage.getItem('art_id');
    this.image_path=localStorage.getItem('image_path');
    this.file_name=localStorage.getItem('file_name');
    this.buildForm();
    this.getEditArtistData=JSON.parse(localStorage.getItem('artistArtDetail'));
    console.log(this.getEditArtistData);

    if(this.getEditArtistData !=null){
       console.log(this.getEditArtistData);
      this.uploadArtWorkform =  this.form.group({
        name:  this.getEditArtistData['title'],
        description: this.getEditArtistData['description'],
        quantity: this.getEditArtistData['quantity'],
        price:this.getEditArtistData['price'],
      });
    }
    this.getbackArtData=JSON.parse(localStorage.getItem('art_data'));
    if(this.getbackArtData !=null){
    
     this.uploadArtWorkform =  this.form.group({
       name:  this.getbackArtData['name'],
       description: this.getbackArtData['description'],
       quantity: this.getbackArtData['quantity'],
       price:this.getbackArtData['price'],
     });
   }
   
  }
  public buildForm() {
    this.uploadArtWorkform = this.form.group(
      {
        name: [ "", [Validators.required]],
        description:[ "", [Validators.required]],
        quantity: [ "", [Validators.required]],
        price: [ "", [Validators.required,Validators.maxLength(5),Validators.pattern(/^[0-9]{1,}/)]],
      }
    );
  }
  get f() {
    return this.uploadArtWorkform.controls;
  }
  public uploadArtWork() {

    this.uploadArtWorkLoader =true;
      if (this.uploadArtWorkform.valid) {
        const art_data = this.uploadArtWorkform.value;

        this.uploadArtWorkLoader =  true;
        localStorage.setItem('art_data',JSON.stringify(art_data));
        let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl||'/artwork-details']);    
        $('html, body').animate({
          scrollTop: $("#myDiv").offset().top
  }, 1000);
          }else{
  
            this.uploadArtWorkLoader =  true;
            
           
          }
     
  }
}
