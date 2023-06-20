import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ArticleCardComponent} from "./components/article-card/article-card.component";
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [ArticleCardComponent, LoaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  exports: [ArticleCardComponent, LoaderComponent]
})
export class SharedModule { }
