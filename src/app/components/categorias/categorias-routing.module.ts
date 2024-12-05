import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CategoriasComponent}
  ])],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
