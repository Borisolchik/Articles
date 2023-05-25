import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  articles: ArticleType[] = [];
  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.getArticles()
      .subscribe(data => {
        this.articles = data.items;
      })
  }
}
