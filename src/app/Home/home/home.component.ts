import { Component, OnInit, NgModule } from '@angular/core';
import { HomeService } from '../services/home/home.service';
declare var $: any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    constructor(public homeService:HomeService) { }

    ngOnInit() {
        $('.slider-testimonial').owlCarousel({
            loop: true,
            nav: true,
            dots: false,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                960: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            },
            navText: ["", ""]
        });
        const url="users/home_pages";
        this.homeService.getHomePageData(url).subscribe((responsse: any) => {
            console.log(responsse);
       
          });

    }

}