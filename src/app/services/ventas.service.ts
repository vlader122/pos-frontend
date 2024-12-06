import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ventas } from '../models/Ventas';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
    ruta = `${environment.rutaBackend}/Venta`;
    constructor(private _httpCliente:HttpClient) { }
    obtener(): Observable<any> {
        return this._httpCliente.get<Ventas>(this.ruta);
    }

    guardar(venta: Ventas): Observable<any> {
        return this._httpCliente.post<void>(this.ruta,venta);
    }

    eliminar(id:number): Observable<any>{
        return this._httpCliente.delete<any>(this.ruta + '/'+id);
    }

    actualizar(venta: Ventas): Observable<any>{
        return this._httpCliente.put<void>(this.ruta, venta);
    }
}
