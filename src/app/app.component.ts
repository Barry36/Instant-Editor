import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MediumEditor } from 'medium-editor';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';




import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  public posts: any;

  constructor(public auth: AuthService, private db: AngularFireDatabase) {
  }

  ngOnInit(): void {}  

}
