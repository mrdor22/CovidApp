import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
