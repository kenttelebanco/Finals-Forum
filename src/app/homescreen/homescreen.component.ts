import { Component, OnInit } from '@angular/core';
import { SentimentalAnalysisService } from '../services/sentimental-analysis.service';
import { FirebaseService } from '../services/firebase.service'
import { Thread } from '../model/thread';


@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {
  postThread: Thread[] = [];

  constructor(private sa: SentimentalAnalysisService,
    private FS: FirebaseService) { } 

  ngOnInit(): void {
    this.sa.getThread().subscribe((val: Thread[]) => {
      this.postThread = val;
    });

    // this.FS.addThread(this.test);
  }


}
