import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CategoriasComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule
  ]
})
export class CategoriasModule { }
