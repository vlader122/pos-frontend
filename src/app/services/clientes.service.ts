import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clientes } from '../models/Clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
    ruta = `${environment.rutaBackend}/Cliente`;
    constructor(private _httpCliente:HttpClient) { }
    obtenerClientes(): Observable<any> {
        return this._httpCliente.get<Clientes>(this.ruta);
    }

    guardarCliente(cliente: Clientes): Observable<any> {
        return this._httpCliente.post<void>(this.ruta,cliente);
    }
}
