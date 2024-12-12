import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    ruta = `${environment.rutaBackend}/login`;

    token: string = environment.token;

    constructor(
        private _httpCliente:HttpClient
    ) { }

    accesos(email: string, password: string){
        const body = { email: email, password: password};
        return this._httpCliente.post(this.ruta, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')
        });
    }

    cerrarSession(){
        sessionStorage.clear();
    }

    obtenerToken(){
        let token = sessionStorage.getItem(this.token);
        if(token === null){
            token = ''
        }
        return token;
    }
}
