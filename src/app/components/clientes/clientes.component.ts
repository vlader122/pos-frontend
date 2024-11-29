import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Clientes } from 'src/app/models/Clientes';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
  providers: [MessageService]
})
export class ClientesComponent implements OnInit{
    clientes:Clientes [] = [];
    cliente: Clientes = new Clientes;
    cols = [];
    clientesDialog = false;
    modalEliminacionCliente = false;
    deleteProductsDialog = false;
    operacion: string = '';
    formulario: FormGroup;

    constructor(
        private _messageService: MessageService,
        private _clientesService: ClientesService
    ){
        this.formulario = new FormGroup({
            nombres: new FormControl('',[Validators.minLength(2),Validators.required]),
            apellidos: new FormControl,
            direccion: new FormControl,
            telefono: new FormControl('',[Validators.required, Validators.pattern(/^\d{7,8}$/)])
        })
    }

    ngOnInit(): void {
        this.cargarDatos();
    }

    abrirDialog(){
        this.operacion = "Nuevo";
        this.clientesDialog = true;
    }

    cargarDatos(){
        this._clientesService.obtenerClientes().subscribe( dato => {
            this.clientes = dato
        })
    }

    guardar(){
        this.cliente.Nombres = this.formulario.value.nombres;
        this.cliente.Apellidos = this.formulario.value.apellidos;
        this.cliente.Direccion = this.formulario.value.direccion;
        this.cliente.Telefono = this.formulario.value.telefono;

        if(this.operacion == "Nuevo"){
            this._clientesService.guardarCliente(this.cliente).subscribe( dato => {
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Cliente Nuevo', life:3000 });
        } else{
            this._clientesService.actualizarCliente(this.cliente).subscribe( dato => {
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Cliente Actualizado', life:3000 });
        }

        this.clientesDialog = false;
        this.formulario.reset();
    }

    ocultar(){
        this.formulario.reset();
        this.clientesDialog = false;
    }

    feliminar(cliente){
        this.cliente.ClienteId = cliente.clienteId;
        this.cliente.Nombres = cliente.nombres;
        this.cliente.Apellidos = cliente.apellidos;

        this.modalEliminacionCliente = true;

    }

    eliminar(id){
        this.modalEliminacionCliente = false;
        this._clientesService.eliminarCliente(id).subscribe(dato =>{
            this.cargarDatos();
        });
        this._messageService.add({ severity: 'warn', summary: 'Correcto', detail: 'Cliente eliminado', life:3000 });
    }

    editarCliente(cliente){
        this.cliente.ClienteId = cliente.clienteId;
        this.operacion = "Editar";
        this.clientesDialog = true;
        this.formulario.patchValue({
            nombres: cliente.nombres,
            apellidos: cliente.apellidos,
            direccion: cliente.direccion,
            telefono: cliente.telefono
        })
    }
}
