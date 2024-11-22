import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioRoutingModule } from './formulario-routing.module';
import { BotonComponent } from './boton/boton.component';
import { FormularioComponent } from './formulario.component';
import { TituloComponent } from './titulo/titulo.component';


@NgModule({
  declarations: [FormularioComponent,BotonComponent],
  imports: [
    CommonModule,
    FormularioRoutingModule,
    TituloComponent
  ]
})
export class FormularioModule { }
