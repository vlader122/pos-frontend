import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m=>m.ClientesModule)},
  ])],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
