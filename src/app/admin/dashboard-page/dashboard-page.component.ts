import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces';
import { PostsService } from 'src/app/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub!: Subscription;
  delSub!: Subscription;
  searchPost = '';

  constructor(private postsService: PostsService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.pSub = this.postsService.getAll().subscribe( posts => {
      this.posts = posts;
    });
  }

  // tslint:disable-next-line: typedef
  remove(id: string | any) {
    // tslint:disable-next-line: deprecation
    this.postsService.remove(id).subscribe( () => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.delSub) {
      this.delSub.unsubscribe();
    }
  }

}
