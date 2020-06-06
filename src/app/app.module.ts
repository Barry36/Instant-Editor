import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyBHtylADroMCmLJC3asrKWU1iYDcuMzDFU",
  authDomain: "simple-pencil-app.firebaseapp.com",
  databaseURL: "https://simple-pencil-app.firebaseio.com",
  projectId: "simple-pencil-app",
  storageBucket: "simple-pencil-app.appspot.com",
  messagingSenderId: "1000425508717",
  appId: "1:1000425508717:web:96a16bd149dcb437505464",
  measurementId: "G-3V00YHTD52"
};
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { TextEditorComponent } from './text-editor/text-editor.component';

@NgModule({
  declarations: [AppComponent, SuperSecretComponent, TextEditorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
    FormsModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
