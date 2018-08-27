import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  postID: String;
  post: any = { likes: [], comments: [] };

  constructor(private _postService: PostService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params
      .mergeMap(data => {
        this.postID = data.ID;
        return this._postService.detail(this.postID);
      }).subscribe(d => {
        console.log(d)
        this.post = d;
      });
  }

}
