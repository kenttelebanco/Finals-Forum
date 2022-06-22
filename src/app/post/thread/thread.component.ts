import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Thread } from 'src/app/model/thread';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  postThread = {} as Thread;


  postForm= this.fb.group({
    title:['', [Validators.required]],
    textArea:['', Validators.required],
  })

  constructor(private fb: FormBuilder, private fireB: FirebaseService) { }

  ngOnInit(): void {
  }

  async onPost(title:string, textArea:string){
    this.postThread.title = title;
    this.postThread.content = textArea;
    var output = await this.fireB.addThread(this.postThread);
    console.log(output);
    alert("Post Submitted!")
  }

}
