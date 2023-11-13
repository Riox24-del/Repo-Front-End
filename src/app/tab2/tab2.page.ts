import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditAgremiadoComponent } from '../components/edit-agremiado/edit-agremiado.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private modalCtrl: ModalController) {}

  async openEditAgremiado(){
    const modal = await this.modalCtrl.create({
      component: EditAgremiadoComponent,
      mode: 'ios',
      initialBreakpoint: .6,
      backdropDismiss: false,
    });
    await modal.present();
  }

  confirmarEliminacion(){
    Swal.fire({
      title: '¿Estas segur@ de elimar al Agremiado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡Eliminalo!',
      backdrop: false
    })
  }

}
