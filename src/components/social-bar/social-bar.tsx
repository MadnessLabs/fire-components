/// <reference types="firebase" />
declare var firebase: firebase.app.App;

import { Component, State } from '@stencil/core';

import { authState } from 'rxfire/auth';
import { collectionData } from 'rxfire/firestore';

import { switchMap } from 'rxjs/operators';

@Component({
  tag: 'fire-social-bar',
  styleUrl: 'social-bar.css',
  shadow: true
})
export class SocialBar {

  @State() todos = [];
  @State() user;

  todosCollection = firebase.firestore().collection('todos');

  componentWillLoad() {
    authState(firebase.auth()).subscribe(u => (this.user = u));

    authState(firebase.auth()).pipe(
      switchMap(user => {
        const query = this.todosCollection.where('user', '==', user.uid);

        return collectionData(query);
      })
    ).subscribe(docs => this.todos = docs );
  }

  login() {
    const provider = new (firebase.auth as any).GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  logout() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button shape="round" onClick={() => this.login()}>
              <ion-icon name="logo-google" />
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button shape="round" onClick={() => this.login()}>
              <ion-icon name="logo-facebook" />
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button shape="round" onClick={() => this.login()}>
              <ion-icon name="logo-twitter" />
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            {JSON.stringify(this.user)}
            <ion-list>
              {
                this.todos.map(todo => 
                  <ion-item>{todo.name}</ion-item>
                )
              }
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    );
  }
}
