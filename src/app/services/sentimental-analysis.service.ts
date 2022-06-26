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

  posJSON:Token[]=posTokens;
  negJSON:Token[]=negTokens;


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
    
    let r = this.analyzeRating("very good but could have been better");
    console.log(r);
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
    var samePosTokens:Token[]=[];
    var sameNegTokens:Token[]=[];
    var textTokens = new this.pos.Lexer().lex(text);
    var taggedWords = new this.pos.Tagger().tag(textTokens);

    var totalTokens = Object.keys(this.posJSON).length + Object.keys(this.negJSON).length;
    var positiveProbability = Object.keys(this.posJSON).length / totalTokens;
    var negativeProbability = Object.keys(this.negJSON).length / totalTokens;
    console.log(positiveProbability);
    console.log(negativeProbability);

    
    for(let val of Object.entries(this.posJSON) ){
      // console.log(val[1]);
      for (let i in taggedWords) {
        var taggedWord = taggedWords[i];
        var word = taggedWord[0];
        var tag = taggedWord[1];
        // console.log(word + " /" + tag);

        if(word === val[1].word && tag === val[1].pos){
          samePosTokens.push(val[1]);
          // console.log("Positive!  " +word + " /" + tag);

        }
      }
    }
    for(let val of Object.entries(this.negJSON) ){
      // console.log(val[1]);
      for (let i in taggedWords) {
        var taggedWord = taggedWords[i];
        var word = taggedWord[0];
        var tag = taggedWord[1];
        // console.log(word + " /" + tag);

        if(word === val[1].word && tag === val[1].pos){
          sameNegTokens.push(val[1]);
          // console.log("Negative!  " +word + " /" + tag);

        }
      }
    }

    console.log(samePosTokens);
    console.log(sameNegTokens);

    for(let pos of Object.values(samePosTokens)){
      // console.log(pos);
      positiveProbability *= pos.probability;
    }
    for(let neg of Object.values(sameNegTokens)){
      // console.log(neg);
      negativeProbability *= neg.probability;
    }
    console.log(positiveProbability);
    console.log(negativeProbability);

    if (positiveProbability >= negativeProbability){
      return "Positive";
    }
    else{
      return "Negative";
    }
  }

  //-------------//

}
