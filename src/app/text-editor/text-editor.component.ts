import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'
import { firestore } from 'firebase';
import { User } from '../services/user.model';
import { Post } from '../services/post.model';



export interface PostId extends Post { id: string; }
declare var MediumEditor:any;

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})


export class TextEditorComponent implements OnInit, AfterViewInit {
  user$: Observable<User>;
  posts: Observable<Post[]>;

  private postsCol: AngularFirestoreCollection<Post>;
  post_tmp: Observable<PostId[]>;
  displayContent: string;
  
  private filteredPosts: Observable<PostId[]>
  private latestPost: PostId;
  private uid: string;

  editor:any;
  
  @ViewChild('editable',{
      static:true
    }) editable:ElementRef;

    ngAfterViewInit(): void {
      
    }

  constructor(private afs: AngularFirestore, private auth: AuthService) 
    {
      this.user$ = auth.user$;
      this.user$.subscribe(data =>
      {
        
        // Get a list of posts that the currUser posted
        this.filteredPosts = this.post_tmp.pipe(
          map(a => {
            return a.filter(post =>{
              this.uid = data.uid;
              return (post.uid === data.uid);
            })
          })
        )
        
        
        this.filteredPosts.pipe(
          map(a =>{
            return a.filter(post => {
              var mostRecentDate = new Date(Math.max.apply(null, a.map( e => {
                return new Date(e.time_created.toDate().toString());
             })));
              var d = new Date(post.time_created.toDate().toString());
              return d.getTime() == mostRecentDate.getTime();
            })
          })
        )
        .subscribe(e =>{
          if(e.length > 0){
            // add posts for user first login
            this.setLatestPost(e[0]);
          }else{
            this.addPost();
          }
        })
        
        
      });
      
      this.postsCol =  this.afs.collection<Post>('posts');
      this.post_tmp = this.postsCol.snapshotChanges().pipe(
        map(actions =>{
          return actions.map(a => {
            const data = a.payload.doc.data() as Post;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      )
    
  }
  

  ngOnInit(): void { 
    this.editor = new MediumEditor(this.editable.nativeElement,{
      paste: {
        /* This example includes the default options for paste,
           if nothing is passed this is what it used */
        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir','name'],
        cleanTags: ['meta'],
        unwrapTags: []
    },
      toolbar: {
          /* These are the default options for the toolbar,
             if nothing is passed this is what is used */
          allowMultiParagraphSelection: true,
          buttons: BUTTONS,
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          /* options which only apply when static is true */
          align: 'center',
          sticky: false,
          updateOnEmptySelection: false
      }
    });
    // var doc = new DOMParser().parseFromString(this.displayContent, "text/xml");
    
    document.getElementById('text-editor-div').focus();
  }  

  addPost(): void {
    console.log("addPost() is called");
    this.auth.user$.subscribe(userData => {
      console.log("userData.uid is: " + userData.uid);
      console.log("this.displayContent is: " + this.displayContent);
      this.afs.collection('posts').add({
        'uid': userData.uid,
        'content': this.displayContent,
        'time_created': firestore.Timestamp.now()
      });
    })
    
  }
  setLatestPost(post:PostId):void{
    this.latestPost = post;
    this.displayContent = this.latestPost.content;
    document.getElementById('text-editor-div').innerHTML = this.displayContent;
  }


  updatePost():void{
    console.log(this.latestPost);
    if(!this.latestPost){
      console.log("New post created!");
      this.addPost();
    }else{
      console.log("Post updated!");
      let data = {
        uid: this.uid,
        content: this.displayContent,
        time_created: firestore.Timestamp.now()
      };
      this.afs.collection('posts').doc(this.latestPost.id).set(data, {merge: true})
    }
  }

  updateModel(value): void{
    this.displayContent = document.getElementById('text-editor-div').innerHTML;    
    this.updatePost();
  }


}


const BUTTONS = [
  'bold'
  ,'italic'
  ,'underline'
  
  ,'subscript'
  ,'superscript'
  ,'anchor'
  ,'quote'
  ,'pre'
  ,'orderedlist'
  ,'unorderedlist'
  ,'indent' 
  ,'justifyLeft'
  ,'justifyCenter'
  ,'justifyRight'
  ,'justifyFull'
  ,'h1'
  ,'h2'
  ,'h3'
  ,'h4'
  ,'h5'
  ,'h6'
  
  ]