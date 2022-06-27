import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Thread } from 'src/app/model/thread';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SentimentalAnalysisService } from 'src/app/services/sentimental-analysis.service';

@Component({
  selector: 'app-view-thread',
  templateUrl: './view-thread.component.html',
  styleUrls: ['./view-thread.component.css']
})
export class ViewThreadComponent implements OnInit {
  postThread = {} as Thread;
  content = " ";
  title = " ";
  author = " ";
  rating = " ";

  postForm= this.fb.group({

    textArea:['', Validators.required],
  })

  constructor(private fb: FormBuilder, private fireB: FirebaseService, private se: SentimentalAnalysisService) { 
    
  }

  ngOnInit(): void {
    this.se.getUserPost().subscribe((val) => {
      console.log(val.data);
      this.content = val.data.content;
      this.title = val.data.title;
      this.author = val.data.authorname;
      this.rating = val.data.rating;
    });
  
  }


}
