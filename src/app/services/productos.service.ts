import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Productos } from '../models/Productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
    ruta = `${environment.rutaBackend}/Producto`;
    constructor(private _httpCliente:HttpClient) { }
    obtener(): Observable<any> {
        return this._httpCliente.get<Productos>(this.ruta);
    }

    guardar(producto: Productos): Observable<any> {
        return this._httpCliente.post<void>(this.ruta,producto);
    }

    eliminar(id:number): Observable<any>{
        return this._httpCliente.delete<any>(this.ruta + '/'+id);
    }

    actualizar(producto: Productos): Observable<any>{
        return this._httpCliente.put<void>(this.ruta, producto);
    }
}
