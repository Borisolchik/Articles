import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryType} from "../../../../types/category.type";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  articles: ArticleType[] = [];
  categories: CategoryType[] = [];
  filterOpen = false;

  constructor(private articleService: ArticleService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.articleService.getArticles()
      .subscribe(data => {
        this.articles = data.items;
      })


    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data;
      })

  }

  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }
}
