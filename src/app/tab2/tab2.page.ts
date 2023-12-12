import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditAgremiadoComponent } from '../components/edit-agremiado/edit-agremiado.component';
import Swal from 'sweetalert2';
import { ServicioService } from '../servicio.service';
import { AlertService } from 'src/app/alert.service';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfmake as any).vfs = pdfFonts.pdfMake.vfs;

interface Agremiado {
  apellidos: string;
  nombre: string;
  sexo: string;
  NUP: string;
  NUE: string;
  RFC: string;
  NSS: string;
  f_nacimiento: string;
  telefono: string;
  cuota: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private modalCtrl: ModalController,private Ss: ServicioService,private _alertService: AlertService) {this.getAgremiado();}
  agremiados: any[] = [];


  async openEditAgremiado(agremiadoId: number) {
    const modal = await this.modalCtrl.create({
      component: EditAgremiadoComponent,
      initialBreakpoint: .4,
    componentProps: {
      agremiadoId: agremiadoId
    }
  });
  
    await modal.present();
  }



  getAgremiado(){
    this.Ss.getAgremiado().subscribe( (resp: any) => {
      console.log('Products', resp);
      this.agremiados = resp;
      this.agremiados.reverse();
    })
  }

  confirmarEliminacion(agremiadoId: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar al Agremiado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Elimínalo!',
      backdrop: false
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, llama al método para eliminar
        this.deleteAgremiado(agremiadoId);
      }
    });
  }

  deleteAgremiado(agremiadoId: number) {
    // Llama al método de eliminación del servicio
    this.Ss.deleteAgremiado(agremiadoId).subscribe(
      (response) => {
        console.log('Agremiado eliminado con éxito', response);
        this._alertService.generateToast({
          duration:800,  color: 'success', icon: 'checkmark-circle', 
          message: 'Miado Eliminado', position: 'bottom'
        })
        this.getAgremiado();
      },
      (error) => {
        console.error('Error al eliminar agremiado', error);
        this._alertService.generateToast({
          duration:800,  color: 'success', icon: 'checkmark-circle', 
          message: 'Error al eliminar Miado ', position: 'bottom'
        })
      }
    );
  }

   generatePDF() {
    // Definir el contenido del PDF
    const documentDefinition = {
      content: [
        {
          text: 'Lista de Agremiados', style: 'header'
        },
        '\n\n',
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['Apellidos', 'Nombre', 'Sexo', 'NUP', 'NUE', 'RFC', 'NSS', 'Fecha Nacimiento', 'Teléfono', 'Cuota'],
              ...this.agremiados.map(agremiado => [
                agremiado.apellidos,
                agremiado.nombre,
                agremiado.sexo,
                agremiado.NUP,
                agremiado.NUE,
                agremiado.RFC,
                agremiado.NSS,
                agremiado.f_nacimiento,
                agremiado.telefono,
                agremiado.cuota
              ])
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          font: 'Roboto'
        }
      }
    };

   
    const pdfDocGenerator = pdfmake.createPdf(documentDefinition);

    // Descargar el PDF
    pdfDocGenerator.download('lista_agremiadoss.pdf');
  }
}
