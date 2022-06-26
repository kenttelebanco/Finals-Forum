import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable,Subscription } from 'rxjs';
import { Thread } from '../model/thread';
import { FirebaseService } from '../services/firebase.service';

import { Trainer } from '../model/trainer';
import { Token } from '../model/token';

import negTokens from '../../assets/negTokens.json';
import posTokens from '../../assets/posTokens.json';

declare function require(path: string): any;
@Injectable({
  providedIn: 'root',
})
export class SentimentalAnalysisService {
  pos = require('pos');
  path = require('path');
  fs = require("fs");

  posJSON:{id:any,token:{word:string,count:number,pos:string,sentiment:string,probability:number}}[]=posTokens;
  negJSON:{id:any,token:{word:string,count:number,pos:string,sentiment:string,probability:number}}[]=negTokens;


  public trainerArray: Trainer[]=[];
  public negativeTrainerArray: Trainer[] = [];
  public positiveTrainerArray: Trainer[] = [];
  private threadCollection: AngularFirestoreCollection<Thread>;
  threads!: Observable<Thread[]>;

  constructor(
    private FS: FirebaseService,
    private afDb: AngularFirestore
  ) {
    this.threadCollection = this.afDb.collection<Thread>('threads');
    this.threads = this.threadCollection.valueChanges();
    
    // this.analyzeRating("very good");
    // console.log(this.posJSON);
  }

  

  // constructor(private FS: FirebaseService) {
  //   // Testing
  //   console.log(lemmatizer("unconditionally"));
  //   var words = new this.pos.Lexer().lex('This is some sample text. This text can contain multiple sentences.');
    // var tagger = new this.pos.Tagger();
    // var taggedWords = tagger.tag(words);
    // for (let i in taggedWords) {
    //   var taggedWord = taggedWords[i];
    //   var word = taggedWord[0];
    //   var tag = taggedWord[1];
  //     console.log(word + " /" + tag);
  //   }
  //   }

  getThread() {
    return this.threads;
  }

  analyzeRating(text:string){
    var textTokens = new this.pos.Lexer().lex(text);
    var taggedWords = new this.pos.Tagger().tag(textTokens);

    for(let pos in posTokens ){
      console.log(Object.entries(pos));
    }
  }

  //-------------//

}
