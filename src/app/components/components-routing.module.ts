import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'formulario', loadChildren: () => import('./formulario/formulario.module').then(m=>m.FormularioModule)},
    { path: 'registro', component: RegistroComponent},
  ])],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
