import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Thread } from '../model/thread';
import { FirebaseService } from '../services/firebase.service'
import {lemmatizer} from "lemmatizer";

declare function require(path: string): any;
@Injectable({
  providedIn: 'root'
})




export class SentimentalAnalysisService {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  private threadCollection: AngularFirestoreCollection<Thread>;
  threads!: Observable<Thread[]>;

  constructor(private FS: FirebaseService, private afDb: AngularFirestore) {
    this.threadCollection = this.afDb.collection<Thread>('threads');
    this.threads = this.threadCollection.valueChanges();
  }
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes


>>>>>>> main



  getThread() {
    return this.threads;
  }



}
