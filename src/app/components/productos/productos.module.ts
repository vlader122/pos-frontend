import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [ProductosComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule
  ]
})
export class ProductosModule { }
