import { Trainer } from '../model/trainer';
import { Token } from '../model/token';

import negTokens from '../../assets/negTokens.json';
import posTokens from '../../assets/posTokens.json';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { CRUDReturn } from '../model/crud_return.interface';
import { Thread } from '../model/thread';
import { FirebaseService } from '../services/firebase.service'
// import {lemmatizer} from "lemmatizer";

declare function require(path: string): any;
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
  displayName: any;
  authorId: any;

  constructor(
    private FS: FirebaseService,
    private afDb: AngularFirestore
  ) {
    this.threadCollection = this.afDb.collection<Thread>('threads');
    this.threads = this.threadCollection.valueChanges();
    
    let r = this.analyzeRating("very good but could have been better");
    console.log(r);
  }

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

  getUserID(author_id: string) {
    return this.authorId = author_id;
  }

  getUserPost(author_id: string): Observable<CRUDReturn> {
    return this.threads.pipe(
      map((Obs) => {
        
          let fl = Obs.filter((thread) => {
            return thread.author_id === author_id;
          });
          return fl.length > 0
            ? {
                success: true,
                data: { author_id: fl[0].author_id, authorname: fl[0].author_name, title: fl[0].title, content: fl[0].content},
              }
            : { success: false, data: null };
        })
    );
  }
}
