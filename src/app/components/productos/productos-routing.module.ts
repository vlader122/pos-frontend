import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ProductosComponent}
  ])],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
