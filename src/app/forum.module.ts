import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumRoutingModule } from './forum.routing.module';

import { HomescreenComponent } from './homescreen/homescreen.component';
import { RegisterComponent } from './auth-screen/register/register.component';
import { SignInComponent } from './auth-screen/sign-in/sign-in.component';
import { UserNavComponent } from './nav/user-nav/user-nav.component';
import { SigninNavComponent } from './nav/signin-nav/signin-nav.component';

import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { ThreadComponent } from './post/thread/thread.component';
import { ViewThreadComponent } from './post/view-thread/view-thread.component';


@NgModule({
  declarations: [
      HomescreenComponent,
      SignInComponent,
      RegisterComponent,
      UserNavComponent,
      SigninNavComponent,
      ThreadComponent,
      ViewThreadComponent
    
      
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    FormsModule,
    ReactiveFormsModule,  

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  exports: [],
  providers:[
  ]

})
export class ForumModule { }
