import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealsPagePage } from './deals-page.page';

const routes: Routes = [
  {
    path: '',
    component: DealsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealsPagePageRoutingModule {}
