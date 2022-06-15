import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumRoutingModule } from './forum.routing.module';

import { HomescreenComponent } from './homescreen/homescreen.component';
import { RegisterComponent } from './auth-screen/register/register.component';
import { SignInComponent } from './auth-screen/sign-in/sign-in.component';
import { UserNavComponent } from './nav/user-nav/user-nav.component';
import { SigninNavComponent } from './nav/signin-nav/signin-nav.component';


@NgModule({
  declarations: [
      HomescreenComponent,
      SignInComponent,
      RegisterComponent,
      UserNavComponent,
      SigninNavComponent
      
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    FormsModule,
    ReactiveFormsModule,  
  ],
  exports: [],
  providers:[]

})
export class ForumModule { }
