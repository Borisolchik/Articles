import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ArticleCardComponent} from "./components/article-card/article-card.component";
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [ArticleCardComponent, LoaderComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [ArticleCardComponent]
})
export class SharedModule { }
