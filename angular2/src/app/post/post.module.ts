import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CommentsComponent } from './comments/comments.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostService } from './post.service';
import { LikeComponent } from './like/like.component';
import { DetailPanelComponent } from './detail-panel/detail-panel.component';

@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    DetailComponent,
    CommentsComponent,
    EditCommentComponent,
    EditPostComponent,
    LikeComponent,
    DetailPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "", component: ListComponent},
      { path: "create", component: CreateComponent},
      { path: "list", component: ListComponent},
      { path: "detail/:ID", component: DetailComponent},
    ]),
    HttpClientModule,
  ],
  providers: [
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class PostModule { }
