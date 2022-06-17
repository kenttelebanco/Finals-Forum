import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserRegister } from 'src/app/model/auth.interface';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isSignedIn = false;
  userRegister = {} as UserRegister;

  regform= this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required],
    fname:[' ', Validators.required],
    lname:[' ', Validators.required],
  })
  
  constructor(private fb: FormBuilder,  private fireB: FirebaseService) { }

  ngOnInit(): void {
  }

  async onRegister(email:string, password:string, fname:string, lname:string){
    this.userRegister.fname = fname;
    this.userRegister.lname = lname;
    this.userRegister.name = fname + lname;
    this.userRegister.email = email;
    this.userRegister.password = password;

    var output = await this.fireB.registerUser(this.userRegister);
    console.log(output);
    this.isSignedIn = output.success;
  }


}
