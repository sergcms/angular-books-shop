import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  login(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  checkAuth(){
    return this.afAuth.authState.map(auth => auth);
  }

  logout(){
    return this.afAuth.auth.signOut();
  }

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

}
