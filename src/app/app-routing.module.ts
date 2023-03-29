import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'tipo-servicos-listagem',
    pathMatch: 'full'
  },
  {
    path: 'cliente-add-edit',
    loadChildren: () => import('./cliente/cliente-add-edit/cliente-add-edit.module').then( m => m.ClienteAddEditPageModule)
  },
  {
    path: 'tipo-servicos-listagem',
    loadChildren: () => import('./tipo-servicos/tipo-servicos-listagem/tipo-servicos-listagem.module').then( m => m.TipoServicosListagemPageModule)
  },
  {
    path: 'tipo-servicos-add-edit/:id',
    loadChildren: () => import('./tipo-servicos/tipo-servicos-add-edit/tipo-servicos-add-edit.module').then( m => m.TipoServicosAddEditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
