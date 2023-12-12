import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  solicitudes: any[] = [];
  fechaInicio: string = '';
  fechaFin: string = '';
  constructor(private Ss: ServicioService,
    private _alertService: AlertService) { this.getSolicitudes(); }

    onDateChange() {
      console.log('Fecha de inicio:', this.fechaInicio);
      console.log('Fecha de fin:', this.fechaFin);
      this.getSolicitudes();
    }
    
    getSolicitudes() {
      this.Ss.getSolicitudes().subscribe((resp: any) => {
        console.log('Solicitudes', resp);
  
        // Filtrar por fecha si las fechas están presentes
        if (this.fechaInicio || this.fechaFin) {
          this.solicitudes = resp.filter((solicitud: any) => {
            const fechaSolicitud = new Date(solicitud.fecha);
  
            // Filtrar por fecha de inicio
            if (this.fechaInicio && fechaSolicitud < new Date(this.fechaInicio)) {
              return false;
            }
  
            // Filtrar por fecha de fin
            if (this.fechaFin && fechaSolicitud > new Date(this.fechaFin)) {
              return false;
            }
  
            return true;
          });
        } else {
          // Si no hay fechas, mostrar todas las solicitudes
          this.solicitudes = resp;
        }
      });
    }

  abrirArchivoEnNuevaVentana(archivo: string): void {
    this.Ss.abrirArchivoEnNuevaVentana(archivo).subscribe((contenido: string) => {
      // Abre una nueva ventana con el contenido del archivo
      const newWindow = window.open();
      newWindow!.document.write(contenido);
    }, (error: any) => {
      console.error('Error al abrir el archivo', error);
      this._alertService.generateToast({
        duration: 800, color: 'danger', icon: 'shirt',
        message: 'Error al abrir el archivo', position: 'bottom'
      });
    });
  }
  
}
