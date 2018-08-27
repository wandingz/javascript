import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _cookieService: CookieService, private _http: HttpClient, private _authService: AuthService) { }

  $posts: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  detail(id) {
    var $o = this._http.get('http://localhost:3000/post/detail/' + id).share();
    $o.subscribe((d: any) => {
      this.$posts.next([d]);
    });
    return $o;
  }

  list() {
    var $o = this._http.get('http://localhost:3000/post/list').share();
    $o.subscribe((d: Array<any>) => {
      this.$posts.next(d);
    });
    return $o;
  }

  create(post) {
    var $o = this._http.post('http://localhost:3000/post/create', post).share();
    $o.subscribe(d => {
      var posts = this.$posts.value;
      posts.push(d);
      this.$posts.next(posts);
    });
    return $o;
  }

  // potential concurrency issues, say two user update one post at same time
  editPost(post) {
    var $o = this._http.post('http://localhost:3000/post/update', post).share();
    $o.subscribe(d => {
      var posts = this.$posts.value;
      var pid = posts.findIndex(p => p._id === post._id);
      posts[pid] = post;
      this.$posts.next(posts);
    });
    return $o;
  }

  //TODO
  //Update author to current user
  //Update to /post/addComment
  addComment(c, post) {
    console.log(new Date(), c, post);
    var $o = this._http.post('http://localhost:3000/post/addComment', { _id: post._id, new_comment: c }).share();
    $o.subscribe(d => {
      var posts = this.$posts.value;
      var pid = posts.findIndex(p => p._id === post._id);
      posts[pid].comments.push(d);
      this.$posts.next(posts);
    });
    return $o;
  }

  deletePost(post) {
    var $o = this._http.post('http://localhost:3000/post/delete', post).share();
    $o.subscribe(d => {
      var posts = this.$posts.value;
      var pid = posts.findIndex(p => p._id === post._id);
      posts.splice(pid, 1);
      this.$posts.next(posts);
    });
    return $o;
  }

  likePost(post) {
    var $o = this._http.post('http://localhost:3000/post/like', post).share();
    $o.subscribe(d => {
      var posts = this.$posts.value;
      var pid = posts.findIndex(p => p._id === post._id);
      if (d) {
        posts[pid].likes.push(d);
      }
      this.$posts.next(posts);
    });
    return $o;
  }

}
