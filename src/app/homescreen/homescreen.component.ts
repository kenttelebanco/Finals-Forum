import { Component, Injectable, OnInit } from '@angular/core';
import { SentimentalAnalysisService } from '../services/sentimental-analysis.service';
import { FirebaseService } from '../services/firebase.service'
import { Thread } from '../model/thread';

@Injectable({
  providedIn: 'root'
})
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
      this.sa.displayName = val;
    });

    // this.FS.addThread(this.test);
  }

  getAuthorID(userid: string){
    this.sa.getUserID(userid);
  }

}
