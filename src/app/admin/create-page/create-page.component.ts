import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces';
import { PostsService } from 'src/app/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form!: FormGroup;

  constructor(private postsService: PostsService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
    });
  }

  // tslint:disable-next-line: typedef
  submit() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    };

    // tslint:disable-next-line: deprecation
    this.postsService.create(post).subscribe( () => {
      this.form.reset();
    });

    console.log(post);
  }

}
