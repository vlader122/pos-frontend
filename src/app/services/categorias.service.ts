import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorias } from '../models/Categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
    ruta = `${environment.rutaBackend}/api/Categoria`;
    constructor(private _httpCliente:HttpClient) { }
    obtener(): Observable<any> {
        return this._httpCliente.get<Categorias>(this.ruta);
    }

    guardar(cliente: Categorias): Observable<any> {
        return this._httpCliente.post<void>(this.ruta,cliente);
    }

    eliminar(id:number): Observable<any>{
        return this._httpCliente.delete<any>(this.ruta + '/'+id);
    }

    actualizar(cliente: Categorias): Observable<any>{
        return this._httpCliente.put<void>(this.ruta, cliente);
    }
}
