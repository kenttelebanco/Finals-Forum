import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Thread } from '../model/thread';
import { FirebaseService } from '../services/firebase.service'
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import {lemmatizer} from "lemmatizer";
import { Trainer } from '../model/trainer';

declare function require(path: string): any;
@Injectable({
  providedIn: 'root'
})




export class SentimentalAnalysisService {
  public trainerArray: Trainer[]=[];
  private threadCollection: AngularFirestoreCollection<Thread>;
  threads!: Observable<Thread[]>;
  
  constructor(private http: HttpClient, private FS: FirebaseService, private afDb: AngularFirestore) {
    this.threadCollection = this.afDb.collection<Thread>('threads');
    this.threads = this.threadCollection.valueChanges();
    this.http.get('model/trainer.csv', {responseType: 'text'}).subscribe(data=>{
      let csvByRow = data.split("\n");
      for (let index = 1; index < csvByRow.length-1; index++) {
        let row = csvByRow[index];
        this.trainerArray.push(new Trainer(parseInt(row[0],10), parseInt(row[1],10), row[2].trim(), parseInt(row[3])));
      }
      console.log(this.trainerArray);
    },error =>{
      console.log(error);
    }
    );
  }
  pos = require('pos');
  

  // constructor(private FS: FirebaseService) {
  //   // Testing
  //   console.log(lemmatizer("unconditionally"));
  //   var words = new this.pos.Lexer().lex('This is some sample text. This text can contain multiple sentences.');
  //   var tagger = new this.pos.Tagger();
  //   var taggedWords = tagger.tag(words);
  //   for (let i in taggedWords) {
  //     var taggedWord = taggedWords[i];
  //     var word = taggedWord[0];
  //     var tag = taggedWord[1];
  //     console.log(word + " /" + tag);
  //   }
  //   }

  getThread() {
    return this.threads;
  }

  readFile(){
    



  }


}
