import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.about').click( function(){ 
        $('html, body').animate({
                                            scrollTop: $(".feedback-top-bar").offset().top
                                     }, 1000);
                                    });
  });
  }

}
