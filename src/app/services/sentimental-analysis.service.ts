import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { CRUDReturn } from '../model/crud_return.interface';
import { Thread } from '../model/thread';
import { Token } from '../model/token';
import { FirebaseService } from '../services/firebase.service'

import negTokens from '../../assets/negTokens.json';
import neuTokens from '../../assets/neuTokens.json';
import posTokens from '../../assets/posTokens.json';

declare function require(path: string): any;
@Injectable({
  providedIn: 'root'
})
export class SentimentalAnalysisService {
  pos = require('pos');
  path = require('path');
  fs = require("fs");
  displayName: any;
  authorId: any;
  threadCollection: AngularFirestoreCollection<Thread>;
  threads: Observable<Thread[]>;

  posJSON:Token[]=posTokens;

  neuJSON:Token[]=neuTokens;

  negJSON:Token[]=negTokens;

  constructor(
    private FS: FirebaseService,
    private afDb: AngularFirestore
  ) {
    this.threadCollection = this.afDb.collection<Thread>('threads');
    this.threads = this.threadCollection.valueChanges();
    
    // let r = this.analyzeRating("very good but could have been better");
    // console.log(this.somposJSON);
  }

  getThread() {
    return this.threads;
  }

  analyzeRating(text:string){
    var samePosTokens:Token[]=[];

    var sameNeuTokens:Token[]=[];

    var sameNegTokens:Token[]=[];

    var textTokens = new this.pos.Lexer().lex(text);
    var taggedWords = new this.pos.Tagger().tag(textTokens);

    var totalTokens = Object.keys(this.posJSON).length + Object.keys(this.negJSON).length 
    + Object.keys(this.neuJSON).length;
    var positiveProbability = Object.keys(this.posJSON).length / totalTokens;

    var neutralProbability = Object.keys(this.neuJSON).length / totalTokens;

    var negativeProbability = Object.keys(this.negJSON).length / totalTokens;

    console.log("positiveProbability: " + positiveProbability);

    console.log("neutralProbability: " + neutralProbability);

    console.log("negativeProbability: " + negativeProbability);

    
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


    for(let val of Object.entries(this.neuJSON) ){
      // console.log(val[1]);
      for (let i in taggedWords) {
        var taggedWord = taggedWords[i];
        var word = taggedWord[0];
        var tag = taggedWord[1];
        // console.log(word + " /" + tag);

        if(word === val[1].word && tag === val[1].pos){
          sameNeuTokens.push(val[1]);
          // console.log("Negative!  " +word + " /" + tag);

        }
      }
    }

    console.log(samePosTokens);

    console.log(sameNeuTokens);

    console.log(sameNegTokens);
    
    for(let val of Object.values(samePosTokens)){
      // console.log(pos);
      positiveProbability *= val.probability;
    }

    for(let val of Object.values(sameNeuTokens)){
      // console.log(neg);
      neutralProbability *= val.probability;
    }

    for(let val of Object.values(sameNegTokens)){
      // console.log(neg);
      negativeProbability *= val.probability;
    }

    console.log("positiveProbability: " + positiveProbability);

    console.log("neutralProbability: " + neutralProbability);

    console.log("negativeProbability: " + negativeProbability);

    if (positiveProbability >= negativeProbability
      && positiveProbability >= neutralProbability){
      console.log("Positive");
      return "Positive";
    }

    else if(neutralProbability >= negativeProbability){
      console.log("Neutral");
      return "Neutral";
    }

    else{
      console.log("Negative");
      return "Negative";
    }
  }



  getUserID(author_id: string) {
    return this.authorId = author_id;
  }

  getUserPost(): Observable<CRUDReturn> {
    return this.threads.pipe(
      map((Obs) => {
        
          let fl = Obs.filter((thread) => {
            return thread.author_id === this.authorId;
          });
          return fl.length > 0
            ? {
                success: true,
                data: { author_id: fl[0].author_id, authorname: fl[0].author_name, title: fl[0].title, content: fl[0].content, rating: fl[0].rating},
              }
            : { success: false, data: null };
        })
    );
  }
}
