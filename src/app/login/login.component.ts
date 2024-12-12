import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password'
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
    private email: string='';
    private password: string='';

    token: string = environment.token;
    formulario: FormGroup;
    error: string = '';

    constructor(
        private _loginService: LoginService,
        private _router: Router
    ){
        this.formulario = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        })
    }

    faceptar(){
        this.email = this.formulario.value.email;
        this.password = this.formulario.value.password;

        this._loginService.accesos(this.email,this.password).subscribe(
            (data) => {
                if(data){
                    const cadenaToken = JSON.stringify(data);
                    const token = JSON.parse(cadenaToken).accessToken;
                    sessionStorage.setItem(this.token, token);
                    this._router.navigateByUrl('/');
                }
            },
            (err) => {
                if(err.status === 0 ){
                    console.log('Error de coneccion 500');
                }
                if(err.status === 401 ){
                    console.log('Credenciales incorrectos');
                }
            }
        )
    }
}
