import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'
import { firestore } from 'firebase';
import { User } from '../services/user.model';
import { Post } from '../services/post.model';



export interface PostId extends Post { id: string; }

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})


export class TextEditorComponent implements OnInit {
  user$: Observable<User>;
  posts: Observable<Post[]>;

  private postsCol: AngularFirestoreCollection<Post>;
  post_tmp: Observable<PostId[]>;
  
  private filteredPosts: Observable<PostId[]>;
  displayContent: string;
  private latestPost: PostId;

  constructor(private afs: AngularFirestore, private auth: AuthService) 
    {
      console.log("constructor called");
      this.user$ = auth.user$;
      this.user$.subscribe(data =>{
        // Get a list of posts that the currUser posted
        this.filteredPosts = this.post_tmp.pipe(
          map(a => {
            return a.filter(post =>{
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
          this.setLatestPost(e[0]);
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
    console.log("onInit");
  }  

  setLatestPost(post:PostId):void{
    this.latestPost = post;
    this.displayContent = this.latestPost.content;
  }




  updatePost():void{
    console.log("updatePost is called!");
    console.log("postID is: " + this.latestPost.id)
    console.log("Post Content is: " + this.displayContent);
    
    let data = {
      content: this.displayContent,
      time_created: firestore.Timestamp.now()
    };
    this.afs.collection('posts').doc(this.latestPost.id).set(data, {merge: true})
  }

}
