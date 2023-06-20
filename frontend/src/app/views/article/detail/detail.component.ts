import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {environment} from 'src/environments/environment';
import {AuthService} from "../../../core/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {CommentService} from "../../../shared/services/comment.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {CommentParamsType} from "../../../../types/comment-params.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentType} from "../../../../types/comment.type";
import {LoaderService} from "../../../shared/services/loader.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  product!: ArticleType;
  productRelated: ArticleType[] = [];
  isLogged: boolean = false;
  serverStaticPath = environment.serverStaticPath;
  commentForm = this.fb.group({
    comment: ['', [Validators.required]]
  });
  activeParams: CommentParamsType = {articleId: ''};
  comments: {allCount: number, comments: CommentType[]} = {
    allCount: 3,
    comments: []
  };
  offset: number = 0;
  showComments: number = 3;
  activeLike: boolean = false;
  activeDislike: boolean = false;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private loaderService: LoaderService,
              private commentService: CommentService,
              private router: Router) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    })
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe((data: ArticleType) => {
          this.product = data;
          this.commentService.getComments({offset: this.offset, article: this.product.id})
            .subscribe((data: {allCount: number, comments: CommentType[]}) => {
              this.comments = data;
            })
        })

      this.articleService.getArticleRelated(params['url'])
        .subscribe((data: ArticleType[]) => {
          this.productRelated = data;
        })
    })
  }

  addComment() {
    this.activeParams.articleId = this.product.id;
    this.router.navigate(['/comments/article-comment-actions?'], {
      queryParams: this.activeParams
    });
    const params = {
      text: this.commentForm.value.comment,
      article: this.product.id
    }
    if (params) {
      this.commentService.addComment(params)
        .subscribe((data: DefaultResponseType) => {
          if (!data.error) {
            this._snackBar.open('Комментарий успешно добавлен');
            this.commentService.getComments({offset: this.offset, article: this.product.id})
              .subscribe((data: {allCount: number, comments: CommentType[]}) => {
                this.comments = data;
              })
            this.commentForm.reset();
          } else {
            this._snackBar.open('Ошибка отправки комментария');
          }
        })
    }
  }

  commentsMore() {
    this.showComments += 10;
  }

  addAction(params: string, id: string) {
    if (params === 'like') {
      this.activeLike = true;
    } else if (params === 'dislike') {
      this.activeDislike = true;
    }
    this.commentService.addAction(params, id)
      .subscribe((data: DefaultResponseType) => {
        if (!data.error) {
          this.activeLike = true;
          this.commentService.getComments({offset: this.offset, article: this.product.id})
            .subscribe((data: {allCount: number, comments: CommentType[]}) => {
              this.comments = data;
            })
        } else {
          this._snackBar.open('Ошибка действия');
        }
      })
  }

  getActionsForComments(id: string) {
    this.commentService.getActionsForComments(id)
      .subscribe((data:{comment: string, action: string}[] | DefaultResponseType) => {
       if (data as DefaultResponseType) {
         this._snackBar.open('Ошибка действия');
       } else if (data as {comment: string, action: string}[]) {
         this._snackBar.open('Жалоба отправлена');
       }
      })
  }
}
