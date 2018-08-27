import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  @Input() post: any;
  @Output() finishEvent: EventEmitter<any> = new EventEmitter();

  comment: any = {};
  show: boolean = false;

  submit() {
    this._postService.addComment(this.comment, this.post)
      .subscribe(d => {
        console.log('success', d);
        this.show = false;
        this.finishEvent.emit(true);
      })
    // this._postService.editComment(this.comment, this.post)
    //   .subscribe(d => {
    //     console.log('success', d);
    //     this.show = false;
    //     this.finishEvent.emit(true);
    //   }, err => {
    //     alert('err');
    //     console.log(err);
    //     this.show = false;
    //     this.finishEvent.emit(true);
    //   });
  }
  cancel() {
    this.show = false;
    this.finishEvent.emit(false);
  }
  addComment() {
    this.show = true;
  }

  constructor(private _postService: PostService) { }

  ngOnInit() {
  }

}
