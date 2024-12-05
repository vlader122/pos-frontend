import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m=>m.ClientesModule)},
    { path: 'categorias', loadChildren: () => import('./categorias/categorias.module').then(m=>m.CategoriasModule)},
    { path: 'productos', loadChildren: () => import('./productos/productos.module').then(m=>m.ProductosModule)},
  ])],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
