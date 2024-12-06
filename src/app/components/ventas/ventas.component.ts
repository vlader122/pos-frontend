import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Clientes } from 'src/app/models/Clientes';
import { Productos } from 'src/app/models/Productos';
import { Ventas } from 'src/app/models/Ventas';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  providers:[MessageService]
})
export class VentasComponent {
    ventas:Ventas [] = [];
    venta: Ventas = new Ventas;
    clientes: Clientes [] = [];
    clientesFiltrados: any[] | undefined;
    productos: Productos [] = [];
    productosFiltrados: any[] | undefined;
    cols = [];
    ventasDialog = false;
    modalEliminacionVenta = false;
    deleteProductsDialog = false;
    operacion: string = '';
    formulario: FormGroup;
    inputFormateado;

    constructor(
        private _messageService: MessageService,
        private _ventasService: VentasService,
        private _clientesService: ClientesService,
        private _productosService: ProductosService
    ){
        this.formulario = new FormGroup({
            descripcion: new FormControl('',[Validators.required]),
            cantidad: new FormControl('',[Validators.required]),
            precio: new FormControl('',[Validators.required]),
            categoriaId: new FormControl('',[Validators.required]),
        })
    }

    ngOnInit(): void {
        this.cargarDatos();
    }

    abrirDialog(){
        this.operacion = "Nuevo";
        this.ventasDialog = true;
        this.fclientes();
        this.fproductos();
    }

    cargarDatos(){
        this._ventasService.obtener().subscribe( dato => {
            this.ventas = dato
        })
    }

    fclientes(){
        this._clientesService.obtener().subscribe( dato=>{
            this.clientes = dato;
        })
    }

    fproductos(){
        this._productosService.obtener().subscribe( dato=>{
            this.productos = dato;
        })
    }

    guardar(){
        if(this.operacion == "Nuevo"){
            this._ventasService.guardar(this.venta).subscribe( dato => {
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Venta Nuevo', life:3000 });
        } else{
            this._ventasService.actualizar(this.venta).subscribe( dato => {
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Venta Actualizado', life:3000 });
        }

        this.ventasDialog = false;
        this.formulario.reset();
    }

    ocultar(){
        this.formulario.reset();
        this.ventasDialog = false;
    }

    feliminar(venta){
        this.venta.VentaId = venta.ventaId;

        this.modalEliminacionVenta = true;

    }

    eliminar(id){
        this.modalEliminacionVenta = false;
        this._ventasService.eliminar(id).subscribe(dato =>{
            this.cargarDatos();
        });
        this._messageService.add({ severity: 'warn', summary: 'Correcto', detail: 'Venta eliminado', life:3000 });
    }

    editarVenta(venta){
        this.venta.VentaId = venta.ventaId;
        this.operacion = "Editar";
        this.ventasDialog = true;
        this.formulario.patchValue({
            descripcion: venta.descripcion,
            cantidad: venta.cantidad,
            precio: venta.precio,
            categoriaId: venta.categoriaId
        })
    }

    clientesFiltro(event: AutoCompleteCompleteEvent){
        let filtrados: any[] = [];
        let query = event.query;

        for(let i=0; i < (this.clientes as any[]).length; i++){
            let cliente = (this.clientes as any[])[i];
            if(cliente.nombres.toLowerCase().indexOf(query.toLowerCase()) == 0){
                filtrados.push(cliente)
            }
        }

        this.clientesFiltrados = filtrados;
    }

    productosFiltro(event: AutoCompleteCompleteEvent){
        let filtrados: any[] = [];
        let query = event.query;

        for(let i=0; i < (this.productos as any[]).length; i++){
            let producto = (this.productos as any[])[i];
            if(producto.descripcion.toLowerCase().indexOf(query.toLowerCase()) == 0){
                filtrados.push(producto)
            }
        }

        this.productosFiltrados = filtrados;
    }
}
