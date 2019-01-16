import { CognitoUtil } from './Shared/services/congnito.service';
import { AwsUtil } from './Shared/services/aws.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {RegisterService} from './Shared/services/signup/register.service';
import { AuthService} from './Shared/services/authService/auth.service';
import { SellartService } from "./Shared/services/sellart/sellart.service";
import {LoginService} from './Shared/services/login/login.service';
import {ArtistService} from './Shared/services/artist/artist.service';
import {UploadartService} from './Arts/services/uploadart/uploadart.service';
import {ArtistProfileService} from './Shared/services/artist-profile/artist-profile.service';
import {SearchingService} from './Shared/services/search/searching.service';
import {FeedbackService} from './Core/services/feedback/feedback.service';
import {ArtdetailsService} from './Shared/services/artdetails/artdetails.service';
import { HomeService } from './Home/services/home/home.service';

import { DataService } from './Shared/services/data.service';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AutoCompleteModule } from 'ng4-auto-complete';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Core/header/header.component';
import { FooterComponent } from './Core/footer/footer.component';
import { HomeComponent } from './Home/home/home.component';
import { SellarartComponent } from './Shared/sellarart/sellarart.component';
import { ArtgeomapComponent } from './Shared/artgeomap/artgeomap.component';
import { ArtistsComponent } from './Shared/artists/artists.component';
import { BlogComponent } from './Shared/blog/blog.component';
import { AboutComponent } from './Shared/about/about.component';
import { ContactComponent } from './Shared/contact/contact.component';
import { TermsandconditionsComponent } from './Shared/termsandconditions/termsandconditions.component';
import { InvitefriendsComponent } from './Shared/invitefriends/invitefriends.component';
import { ArtistsregisterComponent } from './Shared/artistsregister/artistsregister.component';
import { ArtblogdetailComponent } from './Shared/artblogdetail/artblogdetail.component';
import { ArtistprofileComponent } from './Shared/artistprofile/artistprofile.component';
import { JwtModule } from '@auth0/angular-jwt';
/* import { FileSelectDirective } from 'ng2-file-upload'; */
import {FileUploadModule} from 'ng2-file-upload';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MyprofileComponent } from './Users/myprofile/myprofile.component';
import { EditprofileComponent } from './Users/editprofile/editprofile.component';
import { EmailverificationsuccessComponent } from './Users/emailverificationsuccess/emailverificationsuccess.component';
import { RegistrationsuccessComponent } from './Users/registrationsuccess/registrationsuccess.component';
import { Uploadartstep1Component } from './Arts/uploadartstep1/uploadartstep1.component';
import { Uploadartstep2Component } from './Arts/uploadartstep2/uploadartstep2.component';
import { Uploadartstep3Component } from './Arts/uploadartstep3/uploadartstep3.component';
import { Uploadartstep4Component } from './Arts/uploadartstep4/uploadartstep4.component';
import { Uploadartstep5Component } from './Arts/uploadartstep5/uploadartstep5.component';
import { ThankuartistregstrationComponent } from './Arts/thankuartistregstration/thankuartistregstration.component';
import { AuthGuard } from './Shared/services/auth.guard';
import { MyartsComponent } from './Arts/myarts/myarts.component';
import { SearchPipe } from './Shared/services/search.pipe';
import { SearchresultComponent } from './Shared/searchresult/searchresult.component';
import { FilterPipe } from './Shared/services/filter.pipe';
import { ArtdetailsComponent } from './Shared/artdetails/artdetails.component';
import { ArtisanGalleriaComponent } from './Shared/artisan-galleria/artisan-galleria.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {ShareButtonsModule} from 'ngx-sharebuttons';
import { MetaModule, MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';


export function tokenGetter() {
  return localStorage.getItem('token');
}

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: 'Skeuomo',
    defaults: {
      title: 'Test',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus diam libero, cursus commodo arcu commodo non. Proin a nulla nunc. Nunc vulputate, ipsum eu laoreet tempus, erat dui varius sapien, iaculis maximus tortor orci eget ligula. Etiam in augue eros. Praesent eu orci dapibus, commodo est nec, sodales est. Mauris quam mauris, pharetra eget pellentesque at, vehicula viverra metus. Phasellus tincidunt sem blandit interdum euismod. Sed efficitur commodo nulla nec hendrerit. Quisque sed erat sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      'og:image': 'http://skeuomodev.indyo.com/api/data/original/Koala.jpg',
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:locale:alternate': 'en_US,nl_NL,tr_TR'
    }
  });
}
const routes:Routes=[
    
  {path:'',component:HomeComponent},
  {path:'sellart',component:SellarartComponent},
  {path:'artgeo',component:ArtgeomapComponent},
  {path:'artists',component:ArtistsComponent},
  {path:'blog',component:BlogComponent},
  {path:'terms-conditions',component:TermsandconditionsComponent},
  {path:'about-us',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'invite-friends',component:InvitefriendsComponent},
  {path:'artist-register',component:ArtistsregisterComponent},
  {path:'art-blog-detail',component:ArtblogdetailComponent},
  {path:'artist-profile/:id',component:ArtistprofileComponent},
  {path:'edit-profile',component:EditprofileComponent},
  {path:'my-profile',component:MyprofileComponent,canActivate:[AuthGuard]},
  {path:'register-success',component:RegistrationsuccessComponent},
  {path:'verfy-email',component:EmailverificationsuccessComponent},
  {path:'upload-art',component:Uploadartstep1Component,canActivate:[AuthGuard]},
  {path:'upload-art/:id',component:Uploadartstep1Component,canActivate:[AuthGuard]},
  {path:'review-art',component:Uploadartstep2Component,canActivate:[AuthGuard]},
  {path:'add-art-description',component:Uploadartstep3Component,canActivate:[AuthGuard]},
  {path:'artwork-details',component:Uploadartstep4Component,canActivate:[AuthGuard]},
  {path:'additional-media',component:Uploadartstep5Component,canActivate:[AuthGuard]},
  {path:'thanku-registration',component:ThankuartistregstrationComponent},
  {path:'uploaded-arts',component:MyartsComponent},
  {path:'searching-results',component:SearchresultComponent},
  {path:'art-details/:id',component:ArtdetailsComponent},
  {path:'artisan-galleria',component:ArtisanGalleriaComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SellarartComponent,
    ArtgeomapComponent,
    ArtistsComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent,
    TermsandconditionsComponent,
    InvitefriendsComponent,
    ArtistsregisterComponent,
    ArtblogdetailComponent,
    ArtistprofileComponent,
    /* FileSelectDirective, */
    MyprofileComponent,
    EditprofileComponent,
    EmailverificationsuccessComponent,
    RegistrationsuccessComponent,
    Uploadartstep1Component,
    Uploadartstep2Component,
    Uploadartstep3Component,
    Uploadartstep4Component,
    Uploadartstep5Component,
    ThankuartistregstrationComponent,
    MyartsComponent,
    SearchPipe,
    SearchresultComponent,
    FilterPipe,
    ArtdetailsComponent,
    ArtisanGalleriaComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,FileUploadModule,
    ReactiveFormsModule,
    LoadingBarRouterModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AutoCompleteModule,
    ToastrModule.forRoot({
      maxOpened:1,
      autoDismiss:true,
      preventDuplicates:true
    }),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory)
    }),
    ShareButtonsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        
      }
    })
  ],
  providers: [RegisterService,DataService,LoginService,AuthService,ArtistService,SellartService,UploadartService,AuthGuard,ArtistProfileService,SearchingService,FeedbackService,ArtdetailsService,HomeService,AwsUtil,CognitoUtil],
  bootstrap: [AppComponent]
})
export class AppModule { }
