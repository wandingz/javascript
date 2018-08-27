import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() post: any;
  @Output() isLoading: EventEmitter<any> = new EventEmitter();

  show: Boolean = false;

  constructor(private _postService: PostService) { }

  ngOnInit() {
  }

  like() {
    this.isLoading.emit(true);
    this._postService.likePost(this.post)
      .subscribe(d => {
        this.isLoading.emit(false);
      })
  }
  showLikes() {
    this.show = !this.show;
  }
}
