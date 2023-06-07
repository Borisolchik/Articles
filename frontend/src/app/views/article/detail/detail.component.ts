import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {environment} from 'src/environments/environment';
import {AuthService} from "../../../core/auth/auth.service";
import {CommentService} from "../../../shared/services/comment.service";
import {CommentType} from "../../../../types/comment.type";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  product!: ArticleType;
  productRelated: ArticleType[] = [];
  isLogged: boolean = false;
  comments!: {allCount: number, comments: CommentType[]};
  offset: number = 3;


  serverStaticPath = environment.serverStaticPath;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private commentService: CommentService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    })
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe((data: ArticleType) => {
          this.product = data;
        })

      this.articleService.getArticleRelated(params['url'])
        .subscribe((data: ArticleType[]) => {
          this.productRelated = data;
        })

      this.commentService.getComments(this.offset, this.product.id)
        .subscribe((data: {allCount: number, comments: CommentType[]}) => {
          this.comments = data;
        })

      console.log(this.comments);
    })

  }
}
