import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserLogin } from 'src/app/model/auth.interface';
import { User } from 'src/app/model/user';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  isSignedIn = false;
  userLogin = {} as UserLogin;
  data = {} as User;
  
  signinform = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private fireB: FirebaseService, private router: Router) { }

  ngOnInit(): void {
      // Emit something to stop all Observables
      this.unsubscribe.next();
      // Complete the notifying Observable to remove it
      this.unsubscribe.complete();
  }

  async onSignin(email: string, password: string) {
    this.userLogin.email = email;
    this.userLogin.password = password;

    (await this.fireB.signInUser(this.userLogin)).pipe(takeUntil(this.unsubscribe)).subscribe(async (result) => {
      console.log(result);
      this.fireB.displayName = result.data?.fname
      if(result.data == null){
        this.router.navigate(['/signin']);
        alert("Invalid Email or Password. Try Again.")}
      else if(result.data !== null){
          this.router.navigate(['/homescreen']);
      }

      this.isSignedIn = result!.success;
      if(this.isSignedIn){
       
        (await this.fireB.logUser(result.data!.id)).subscribe((user)=>{
          //console.log(this.fireB.currentUser);
          this.fireB.updateUser(user!)
          
        });
      }
    })
  }

}
