import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Categorias } from 'src/app/models/Categorias';
import { Productos } from 'src/app/models/Productos';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  providers: [MessageService, CurrencyPipe]
})
export class ProductosComponent implements OnInit{
    productos:Productos [] = [];
    producto: Productos = new Productos;
    categorias: Categorias [] = [];
    cols = [];
    productosDialog = false;
    modalEliminacionProducto = false;
    deleteProductsDialog = false;
    operacion: string = '';
    formulario: FormGroup;
    inputFormateado;

    constructor(
        private _messageService: MessageService,
        private _productosService: ProductosService,
        private _categoriasService: CategoriasService,
        private _currencyPipe: CurrencyPipe
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
        this.productosDialog = true;
        this._categoriasService.obtener().subscribe( dato=>{
            this.categorias = dato;
            console.log(this.categorias);

        })
    }

    cargarDatos(){
        this._productosService.obtener().subscribe( dato => {
            this.productos = dato
        })
    }

    guardar(){
        this.producto.Descripcion = this.formulario.value.descripcion;
        this.producto.Cantidad = this.formulario.value.cantidad;
        this.producto.Precio = this.formulario.value.precio;
        this.producto.CategoriaId = this.formulario.value.categoriaId;


        if(this.operacion == "Nuevo"){
            this._productosService.guardar(this.producto).subscribe( dato => {
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Producto Nuevo', life:3000 });
        } else{
            this._productosService.actualizar(this.producto).subscribe( dato => {
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Producto Actualizado', life:3000 });
        }

        this.productosDialog = false;
        this.formulario.reset();
    }

    ocultar(){
        this.formulario.reset();
        this.productosDialog = false;
    }

    feliminar(producto){
        this.producto.ProductoId = producto.productoId;
        this.producto.Descripcion = producto.descripcion;

        this.modalEliminacionProducto = true;

    }

    eliminar(id){
        this.modalEliminacionProducto = false;
        this._productosService.eliminar(id).subscribe(dato =>{
            this.cargarDatos();
        });
        this._messageService.add({ severity: 'warn', summary: 'Correcto', detail: 'Producto eliminado', life:3000 });
    }

    editarProducto(producto){
        this.producto.ProductoId = producto.productoId;
        this.operacion = "Editar";
        this.productosDialog = true;
        this.formulario.patchValue({
            descripcion: producto.descripcion,
            cantidad: producto.cantidad,
            precio: producto.precio,
            categoriaId: producto.categoriaId
        })
    }

    tranformarCurrency(event: FocusEvent){
        const inputElement = event.target as HTMLInputElement;
        const value = inputElement.value;
        const formateado = this._currencyPipe.transform(value, 'Bs.', 'symbol', '1.2-2');
        if (formateado) {
          inputElement.value = formateado;
        }
    }
}

