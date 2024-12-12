import { AccesosGuard } from './accesos.guard';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';

@Injectable()
export class AccesosInterceptor implements HttpInterceptor {

    token: string = environment.token;

    constructor(
        private _loginService: LoginService
    ){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this._loginService.obtenerToken();

        if(!req.url.includes('/register') && token){
            const peticionConToken = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
            return next.handle(peticionConToken);
        } else {
            return next.handle(req);
        }

    }
} {

}
