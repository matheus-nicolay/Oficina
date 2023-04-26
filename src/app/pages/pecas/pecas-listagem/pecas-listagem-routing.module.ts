import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PecasListagemPage } from './pecas-listagem.page';

const routes: Routes = [
  {
    path: '',
    component: PecasListagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PecasListagemPageRoutingModule {}
