import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultWebComponent } from './components/default-web/default-web.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultWebComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class defaultRoutingModule { }