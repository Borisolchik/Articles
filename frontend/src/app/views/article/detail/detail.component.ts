import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {environment} from 'src/environments/environment';
import {AuthService} from "../../../core/auth/auth.service";

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

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleService) {
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
    })
  }
}
