import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {RequestType} from "../../../../types/request.type";
import {BannerService} from "../../services/banner.service";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild('callBackPopup') callBackPopup!: TemplateRef<ElementRef>;
  @ViewChild('popupSuccess') popupSuccess!: TemplateRef<ElementRef>;
  callBackForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });
  sendError: boolean = false;

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private bannerService: BannerService) {
  }

  ngOnInit(): void {
  }

  openCallBackPopup() {
    this.dialog.open(this.callBackPopup);
  }

  closeCallBackPopup() {
    this.dialog.closeAll();
  }

  requestBanner() {
    if (this.callBackForm.valid &&
      this.callBackForm.value.name &&
      this.callBackForm.value.phone) {
      const paramsObject: RequestType = {
        name: this.callBackForm.value.name,
        phone:  this.callBackForm.value.phone,
        service: 'consultation',
        type: 'consultation'
      }

      this.bannerService.requestBanner(paramsObject)
        .subscribe({
          next: (data:DefaultResponseType) => {
            if (data.error) {
              this.sendError = true;
            } else {
              this.dialog.closeAll();
              this.dialog.open(this.popupSuccess);
              this.callBackForm.reset();
            }
          }
        });
    }
  }
}
