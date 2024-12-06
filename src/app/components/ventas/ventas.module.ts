import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { VentasComponent } from './ventas.component';
import { AutoCompleteModule } from 'primeng/autocomplete';



@NgModule({
  declarations: [VentasComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    AutoCompleteModule
  ]
})
export class VentasModule { }
