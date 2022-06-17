import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CRUDReturn } from '../model/crud_return.interface';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private usersCollection : AngularFirestoreCollection<User>

  displayName:any;
  loggedUser = {} as User

  private source = new BehaviorSubject<User>(this.loggedUser);

  currentUser = this.source.asObservable();

  user$!: Observable<User[]>
  signedIn: boolean = false;

  constructor(private afDb: AngularFirestore) { 
    this.usersCollection = afDb.collection<User>('users');
    this.user$ = this.usersCollection.valueChanges();  
  }

  //FOR USER
  async registerUser(payload: any): Promise<CRUDReturn>{
    try{
      payload.id = this.afDb.createId();
      this.usersCollection.doc(payload.id).set(payload);
      return {
        success: true,
        data: payload,
      };
    }catch(error){
      console.log(error);
      return {success: false, data: error};
    }
  } 

  async signInUser(payload: any) {
     return this.user$.pipe(map((doc) =>{
      {
        let fl = doc.filter((user)=>{
          return user.email === payload.email;
        });
        
        if (fl[0] == undefined){
            return {success: true, data: null}
            }
        return fl[0].password == payload.password ? {success: true, data: fl[0]} : {success: true, data: null}
      }
     }))
  }

  async logUser(id: string){
    return this.user$.pipe(map((doc) =>{
      {
        let fl = doc.filter((user)=>{
          return user.id === id;
        });
        
        return fl.length > 0 ? fl[0] : null;
        // return fl.length > 0 ? fl[0] : null;
      }
     }))
  }

  async updateUser(user: User){
    this.source.next(user);
  } 
}
