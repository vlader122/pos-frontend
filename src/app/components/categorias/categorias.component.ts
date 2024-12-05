import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Categorias } from 'src/app/models/Categorias';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  providers: [MessageService]
})
export class CategoriasComponent implements OnInit{
    categorias:Categorias [] = [];
    categoria: Categorias = new Categorias;
    cols = [];
    categoriasDialog = false;
    modalEliminacionCategoria = false;
    deleteProductsDialog = false;
    operacion: string = '';
    formulario: FormGroup;

    constructor(
        private _messageService: MessageService,
        private _categoriasService: CategoriasService
    ){
        this.formulario = new FormGroup({
            descripcion: new FormControl('',[Validators.required]),
        })
    }

    ngOnInit(): void {
        this.cargarDatos();
    }

    abrirDialog(){
        this.operacion = "Nuevo";
        this.categoriasDialog = true;
    }

    cargarDatos(){
        this._categoriasService.obtener().subscribe( dato => {
            this.categorias = dato
        })
    }

    guardar(){
        this.categoria.Descripcion = this.formulario.value.descripcion;

        if(this.operacion == "Nuevo"){
            this._categoriasService.guardar(this.categoria).subscribe( dato => {
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Categoria Nuevo', life:3000 });
        } else{
            this._categoriasService.actualizar(this.categoria).subscribe( dato => {
                this.cargarDatos();
            });
            this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Categoria Actualizado', life:3000 });
        }

        this.categoriasDialog = false;
        this.formulario.reset();
    }

    ocultar(){
        this.formulario.reset();
        this.categoriasDialog = false;
    }

    feliminar(categoria){
        this.categoria.CategoriaId = categoria.categoriaId;
        this.categoria.Descripcion = categoria.descripcion;

        this.modalEliminacionCategoria = true;

    }

    eliminar(id){
        this.modalEliminacionCategoria = false;
        this._categoriasService.eliminar(id).subscribe(dato =>{
            this.cargarDatos();
        });
        this._messageService.add({ severity: 'warn', summary: 'Correcto', detail: 'Categoria eliminado', life:3000 });
    }

    editarCategoria(categoria){
        this.categoria.CategoriaId = categoria.categoriaId;
        this.operacion = "Editar";
        this.categoriasDialog = true;
        this.formulario.patchValue({
            descripcion: categoria.descripcion,
        })
    }
}

