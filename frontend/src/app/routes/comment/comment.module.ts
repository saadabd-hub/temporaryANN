import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentComponent } from '../../components/comment/comment.component';


@NgModule({
  declarations: [CommentComponent],
  imports: [
    CommonModule,
    CommentRoutingModule
  ]
})
export class CommentModule { }
