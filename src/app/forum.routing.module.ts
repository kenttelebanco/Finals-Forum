import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth-screen/register/register.component';
import { SignInComponent } from './auth-screen/sign-in/sign-in.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { ThreadComponent } from './post/thread/thread.component';


const routes: Routes = [
{path: '', redirectTo: 'signin', pathMatch: 'full' },
{path: 'homescreen', component:HomescreenComponent},
{path: 'signin', component:SignInComponent},
{path: 'register', component:RegisterComponent},
{path: 'thread', component:ThreadComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
