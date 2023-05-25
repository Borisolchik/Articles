import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleService} from "../../shared/services/article.service";
import {ArticleType} from "../../../types/article.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestType} from "../../../types/request.type";
import {BannerService} from "../../shared/services/banner.service";

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
    service: ['', [Validators.required]],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  })
  @ViewChild('bannerPopup') bannerPopup!: TemplateRef<ElementRef>;
  @ViewChild('bannerPopupSuccess') bannerPopupSuccess!: TemplateRef<ElementRef>;
  title_service: string = '';

  constructor(private articleService: ArticleService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private bannerService: BannerService) {
  }

  ngOnInit(): void {
    this.articleService.getTopArticles()
      .subscribe((data: ArticleType[]) => {
        this.articles = data;
      })
  }

  openBannerPopup(service: string) {
    this.bannerForm.value.service = service;
    this.dialog.open(this.bannerPopup);
  }

  closeBannerPopup() {
    this.dialog.closeAll();
  }

  requestBanner() {
    if (this.bannerForm.valid &&
      this.bannerForm.value.service &&
      this.bannerForm.value.name &&
      this.bannerForm.value.phone) {
      const paramsObject: RequestType = {
        name: this.bannerForm.value.name,
          phone:  this.bannerForm.value.phone,
          service: this.bannerForm.value.service,
          type: 'order'
      }

      this.bannerService.requestBanner(paramsObject)
        .subscribe({
          next: (data:DefaultResponseType) => {
            this.dialog.closeAll();
            this.dialog.open(this.bannerPopupSuccess);
            // this.dialogRef = this.dialog.open(this.popup);
            // this.dialogRef.backdropClick()
            //   .subscribe(() => {
            //     this.router.navigate(['/']);
            //   });
            // this.cartService.setCount(0);
          }
        });
    }
  }
}
