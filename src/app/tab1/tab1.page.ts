import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewAgremiadoComponent } from '../components/new-agremiado/new-agremiado.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( private modalCtrl: ModalController) {}


  async openNewAgremiado(){
    const modal = await this.modalCtrl.create({
      component: NewAgremiadoComponent,
      mode: 'ios',
      backdropDismiss: false
    });
    await modal.present();
  }
}
