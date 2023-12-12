import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../servicio.service';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  loginForm: FormGroup;
  constructor(private router: Router,private fb: FormBuilder,private Ss: ServicioService,private _alertService: AlertService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
   }

  ngOnInit() {}
  navigateTo(section: string): void {
    // Aquí puedes definir las rutas a las secciones correspondientes
    switch (section) {
      case 'formatos':
        this.router.navigate(['/formatos']);
        break;
      case 'convocatorias':
        this.router.navigate(['/convocatorias']);
        break;
      case 'convenios':
        this.router.navigate(['/convenios']);
        break;
      default:
        break;
    }
  }

  
  async onLogin() {
    if (this.formValid()) {
      const credentials = {
        NUE: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      try {
        const response = await this.Ss.loginUsuario(credentials).toPromise();
        const token = response['token'];
        // Guarda el token en el almacenamiento local o donde desees
        localStorage.setItem('auth_token', token);

        // Obtén el id_rol del usuario desde la respuesta
        const id_rol = response['Usuario']['id_rol'];

        // Redirige según el id_rol
        if (id_rol === 1) {
          // Redirige a las tabs
          this.router.navigate(['/tabs']);
          this._alertService.generateToast({
            duration:800,  color: 'success', icon: 'bicycle', 
            message: 'Bienvenido Administrador', position: 'bottom'
          })
        } else if (id_rol === 2) {
          // Redirige a la página de solicitudes
          this.router.navigate(['/solicitud']);
           this._alertService.generateToast({
          duration:800,  color: 'success', icon: 'school', 
          message: 'Bienvenido Agremiado', position: 'bottom'
        })
      
        } else {
          // Redirige a una página predeterminada o maneja otros roles según sea necesario
          // this.router.navigate(['/otra-pagina']);
        }
      } catch (error) {
        console.error('Error de autenticación:', error);
        // Puedes manejar el error aquí (mostrar un mensaje, redirigir, etc.)
        this._alertService.generateToast({
          duration:800,  color: 'danger', icon: 'checkmark-circle', 
          message: 'Error Miado ', position: 'bottom'
        })
      }
    }
  }

  formValid() {
    return this.loginForm.valid;
  }
}
