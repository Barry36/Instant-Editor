import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MediumEditor } from 'medium-editor';
import { AngularFireDatabase } from 'angularfire2/database';




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
