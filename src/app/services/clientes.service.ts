import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clientes } from '../models/Clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
    ruta = `${environment.rutaBackend}/api/Cliente`;
    constructor(private _httpCliente:HttpClient) { }
    obtener(): Observable<any> {
        return this._httpCliente.get<Clientes>(this.ruta);
    }

    guardar(cliente: Clientes): Observable<any> {
        return this._httpCliente.post<void>(this.ruta,cliente);
    }

    eliminar(id:number): Observable<any>{
        return this._httpCliente.delete<any>(this.ruta + '/'+id);
    }

    actualizar(cliente: Clientes): Observable<any>{
        return this._httpCliente.put<void>(this.ruta, cliente);
    }
}
