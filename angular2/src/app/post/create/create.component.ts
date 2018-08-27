import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  postForm: any = {};

  submit() {
    this._postService.create(this.postForm)
      .subscribe(d => {
        console.log('success', d);
        this._router.navigate(["/post/list"]);
      }, err => {
        console.log(err);
        alert('err');
      });
  }
  constructor(private _postService: PostService, private _router: Router) { }

  ngOnInit() {
  }

}
