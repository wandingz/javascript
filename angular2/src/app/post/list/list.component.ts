import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  postList: Array<any> = [];

  constructor(private _postService: PostService) { }

  ngOnInit() {
    this._postService.list()
    this._postService.$posts
      .subscribe(d => {
        this.postList = d;
      })
  }

}
