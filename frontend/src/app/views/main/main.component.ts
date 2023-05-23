import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleService} from "../../shared/services/article.service";
import {ArticleType} from "../../../types/article.type";
import {AuthService} from "../../core/auth/auth.service";
import {UserService} from "../../shared/services/user.service";
import {UserInfoType} from "../../../types/user-info.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  reviewOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 25,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  }
  articles: ArticleType[] = [];
  bannerForm = this.fb.group({
    category: ['', [Validators.required]],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  })
  @ViewChild('bannerPopup') bannerPopup!: TemplateRef<ElementRef>;

  constructor(private articleService: ArticleService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.articleService.getTopArticles()
      .subscribe((data: ArticleType[]) => {
        this.articles = data;
      })
  }

  OpenBannerPopup() {
    this.dialog.open(this.bannerPopup);
  }

  closeBannerPopup() {
    this.dialog.closeAll();
  }
}
