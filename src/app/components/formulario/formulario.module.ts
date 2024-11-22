import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormularioRoutingModule } from './formulario-routing.module';
import { FormularioComponent } from './formulario.component';
import { TituloComponent } from './titulo/titulo.component';
import { BotonComponent } from "./boton/boton.component";


@NgModule({
    imports: [
    CommonModule,
    FormularioRoutingModule,
    ButtonModule,
    BotonComponent
],
    declarations: [FormularioComponent, TituloComponent]
})
export class FormularioModule { }
