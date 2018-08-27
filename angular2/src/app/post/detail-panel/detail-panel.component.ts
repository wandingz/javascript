import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.css']
})
export class DetailPanelComponent implements OnInit {

  @Input() post: any;
  @Input() detailRouterLink: String;

  constructor(private _postService: PostService) { }

  ngOnInit() {
  }

  deletePost(post_id) {
    this._postService.deletePost({ _id: post_id })
      .subscribe(d => {
      }, err => {
        alert(err.error.message)
        console.log(err)
      })
  }

}
