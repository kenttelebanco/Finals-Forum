import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Thread } from 'src/app/model/thread';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SentimentalAnalysisService } from 'src/app/services/sentimental-analysis.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  postThread = {} as Thread;

  postForm= this.fb.group({
    title:['', [Validators.required]],
    authorname:['', [Validators.required]],
    textArea:['', Validators.required],
  })

  constructor(private fb: FormBuilder, private fireB: FirebaseService, private se: SentimentalAnalysisService) { }

  ngOnInit(): void {
  }

  async onPost(title:string, authorname:string, textArea:string){
    this.postThread.title = title;
    this.postThread.author_name = authorname;
    this.postThread.content = textArea;
    this.postThread.rating = this.se.analyzeRating(textArea);
    var output = await this.fireB.addThread(this.postThread);
    console.log(output);
    alert("Post Submitted!")
  }
/////
}
