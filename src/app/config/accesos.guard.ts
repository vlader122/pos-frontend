import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../services/login.service";

export const AccesosGuard: CanActivateFn = (route, state) =>{
    const _loginService =inject(LoginService);
    const _ruta = inject(Router);

    const token = _loginService.obtenerToken();

    if(!token){
        sessionStorage.clear();
        _ruta.navigateByUrl('/login');
        return false;
    } else {
        return true;
    }
}
