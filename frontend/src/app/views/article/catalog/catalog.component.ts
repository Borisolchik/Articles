import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryType} from "../../../../types/category.type";
import {Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  articles: ArticleType[] = [];
  categories: CategoryType[] = [];
  filterOpen = false;
  activeParams: ActiveParamsType = {categories: []};
  pages: number [] = [];

  constructor(private articleService: ArticleService,
              private router: Router,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.articleService.getArticles()
      .subscribe(data => {
        this.pages = [];
        for (let i = 1; i <= data.pages; i++) {
          this.pages.push(i);
        }
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

  sort(value: string) {
    this.activeParams.categories = [value];
    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    })

  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      });
    }
  }
}
