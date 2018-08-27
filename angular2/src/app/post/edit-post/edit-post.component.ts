import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @Input() post: any;
  @Output() finishEvent: EventEmitter<any> = new EventEmitter();

  postForm: any = {};
  show: boolean = false;

  submit() {
    this._postService.editPost(this.postForm)
      .subscribe(d => {
        console.log('success', d);
        this.show = false;
        this.finishEvent.emit(true);
      }, err => {
        alert(err.error.message)
        console.log(err);
        this.show = false;
        this.finishEvent.emit(true);
      });
  }
  cancel() {
    this.show = false;
    this.finishEvent.emit(false);
  }

  editPost() {
    this.show = true;
  }

  constructor(private _postService: PostService) { }

  ngOnInit() {
    this.postForm = JSON.parse(JSON.stringify(this.post));
  }
}
