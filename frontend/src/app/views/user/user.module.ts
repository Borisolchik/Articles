import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AgreementComponent } from './agreement/agreement.component';
import {SharedModule} from "../../shared/shared.module";
import {ArticleRoutingModule} from "../article/article-routing.module";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AgreementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArticleRoutingModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
