import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $ : any;

@Component({
  selector: 'app-uploadartstep2',
  templateUrl: './uploadartstep2.component.html',
  styleUrls: ['./uploadartstep2.component.css']
})
export class Uploadartstep2Component implements OnInit {
  image_path="";
 name="";
  art_id: any="";
  constructor(public route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.image_path=localStorage.getItem('image_path');
    this.name=localStorage.getItem('file_name');
    this.art_id=localStorage.getItem('art_id');
  }
  remove(){
    this.image_path ="";
    localStorage.setItem('image_path','');
    let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigate([returnUrl||'/upload-art']);
    $('html, body').animate({
      scrollTop: $("#myDiv").offset().top
}, 1000);
  }

}
