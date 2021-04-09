import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/interfaces';
import { PostsService } from 'src/app/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  post!: Post;
  submitted = false;
  UpdateSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.route.params
    .pipe(switchMap( (params: Params) => {
      return this.postsService.getById(params['id']);
    })
    // tslint:disable-next-line: deprecation
    ).subscribe( (post: Post) => {
      this.post = post;
      this.form = new FormGroup( {
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      });
    });
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    if(this.UpdateSub) {
      this.UpdateSub.unsubscribe();
    }
  }

  // tslint:disable-next-line: typedef
  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.UpdateSub = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    // tslint:disable-next-line: deprecation
    }).subscribe( () => {
      this.submitted = false;
    });
  }
}
