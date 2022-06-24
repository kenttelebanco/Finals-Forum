import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Thread } from '../model/thread';
import { FirebaseService } from '../services/firebase.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { lemmatizer } from 'lemmatizer';
import { Trainer } from '../model/trainer';
import { Token } from '../model/token';

declare function require(path: string): any;
@Injectable({
  providedIn: 'root',
})
export class SentimentalAnalysisService {
  pos = require('pos');


  public trainerArray: Trainer[]=[];
  public negativeTrainerArray: Trainer[] = [];
  public positiveTrainerArray: Trainer[] = [];
  private threadCollection: AngularFirestoreCollection<Thread>;
  threads!: Observable<Thread[]>;

  constructor(
    private http: HttpClient,
    private FS: FirebaseService,
    private afDb: AngularFirestore
  ) {
    this.threadCollection = this.afDb.collection<Thread>('threads');
    this.threads = this.threadCollection.valueChanges();
    this.http.get('/assets/trainer.csv', { responseType: 'text' }).subscribe(
      (data) => {
        let csvByRow = data.split(new RegExp('\n'));
        console.log(csvByRow[1]);

        for (let index = 1; index < csvByRow.length - 1; index++) {
          let row = csvByRow[index].split(
            new RegExp(',(?=(?:[^"]*"[^"]*")*[^"]*$)')
          );
          let words = new this.pos.Lexer().lex(row[2].trim());

          if (parseInt(row[3], 10) == 4) {
            this.positiveTrainerArray.push(
              new Trainer(
                parseInt(row[0], 10),
                parseInt(row[1], 10),
                words,
                parseInt(row[3], 10)
              )
            );
          }if (parseInt(row[3], 10) == 0) {
            this.negativeTrainerArray.push(
              new Trainer(
                parseInt(row[0], 10),
                parseInt(row[1], 10),
                words,
                parseInt(row[3], 10)
              )
            );
          }
        }
        
        console.log(this.positiveTrainerArray[0]);
        console.log(this.negativeTrainerArray[0]);
      },
      (error) => {
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
    this.http.get('/assets/trainer.csv', {responseType: 'text'}).subscribe(data=>{
      let csvByRow = data.split(new RegExp("\n"));
      console.log(csvByRow[1]);
      for (let index = 1; index < csvByRow.length-1; index++) {
        let row = csvByRow[index].split(new RegExp(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"));
        let words = new this.pos.Lexer().lex(row[2].trim());
        this.trainerArray.push(new Trainer(parseInt(row[0],10), parseInt(row[1],10), words, parseInt(row[3],10)));
      }
      console.log(this.trainerArray[0]);
    },error =>{
      console.log(error);
    }
    );



  }

  posTokens:Array<Token> = [];
  negTokens:Array<Token> = [];
  GroupTokens(){
    var dataset:Array<Trainer> = this.trainerArray;

    for(let data of dataset ){
      for(let tok of this.posTokens){
        data.tokens.find((w:string) =>{
          if(!tok.word.includes(w.toLowerCase())){
            
          }
        });
      }

      

      
    }
    

    return
  }



}
