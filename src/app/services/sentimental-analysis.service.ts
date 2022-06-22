import { Injectable } from '@angular/core';
import { FirebaseService } from '../services/firebase.service'
import {lemmatizer} from "lemmatizer";

declare function require(path: string): any;
@Injectable({
  providedIn: 'root'
})




export class SentimentalAnalysisService {
  pos = require('pos');

  constructor(private FS: FirebaseService) {
    // Testing
    console.log(lemmatizer("unconditionally"));
    var words = new this.pos.Lexer().lex('This is some sample text. This text can contain multiple sentences.');
    var tagger = new this.pos.Tagger();
    var taggedWords = tagger.tag(words);
    for (let i in taggedWords) {
      var taggedWord = taggedWords[i];
      var word = taggedWord[0];
      var tag = taggedWord[1];
      console.log(word + " /" + tag);
    }
    }





  


}
