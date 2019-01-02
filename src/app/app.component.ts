import { Component } from '@angular/core';
import { fadeAnimation } from './animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeAnimation
    // animation triggers go here
  ]
})
export class AppComponent {
  constructor(private router:Router){
   
  }
  prepareRoute(outlet: any) {
//    // setTimeout(()=>{
//     if(outlet.isActivated==true){
//       return outlet.activatedRoute;
//     }else{
     
//         this.router.navigate(['/']);
     
//     }
//  // },1000);
    //return outlet.isActivated ? outlet.activatedRoute :'';
    /* return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']; */
  }

  title = 'skeuomo';



}
