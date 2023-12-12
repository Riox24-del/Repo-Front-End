import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from 'src/app/servicio.service';
import { AlertService } from 'src/app/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent  implements OnInit {
  formSolicitud: FormGroup;
  agremiadoData: any = {};

  nue: string = '';
  archivo: File | null = null;
  constructor( private Ss: ServicioService,private router: Router ,
    private fb: FormBuilder,private _alertService: AlertService) { 
    this.formSolicitud = this.fb.group({
      NUE: ['', Validators.required],
      archivo: [null, Validators.required]
    });
  }


  ngOnInit() {
    this.getAgremiadoData();
  }

  getAgremiadoData() {
    // Llama al servicio para obtener los datos del agremiado
    this.Ss.getAgremiado().subscribe(
      (response: any) => {
        // Asigna los datos del primer agremiado (puedes ajustar esto según tus necesidades)
        this.agremiadoData = response[0];
      },
      (error) => {
        console.error('Error al obtener los datos del agremiado', error);
      }
    );
  }

  onSubmit() {
    if (this.nue && this.archivo) {
      this.Ss.agregarSolicitud(this.nue, this.archivo).subscribe(
        response => {
          console.log('Solicitud agregada exitosamente', response);
          this._alertService.generateToast({
            duration:800,  color: 'success', icon: 'ice-cream', 
            message: 'Solicitud enviada correctamente', position: 'bottom'
          })
        },
        error => {
          console.error('Error al agregar la solicitud', error);
          this._alertService.generateToast({
            duration:800,  color: 'success', icon: 'walk', 
            message: 'MEEEEEH ERRRORRRR ', position: 'bottom'
          })
        }
      );
    } else {
      console.error('Completa todos los campos del formulario');
      this._alertService.generateToast({
        duration:800,  color: 'warning', icon: 'heart-dislike', 
        message: 'Porfavor completa todos los campos del formulario ', position: 'bottom'
      })
    }
  }

  onArchivoChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.archivo = fileList[0];
    }
  }
  
  


  logout() {
    // Aquí puedes agregar lógica de cierre de sesión si es necesario
    // Por ahora, simplemente navega al login
    this.router.navigateByUrl('/login');
  }
}
