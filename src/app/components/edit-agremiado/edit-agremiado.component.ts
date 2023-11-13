import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-agremiado',
  templateUrl: './edit-agremiado.component.html',
  styleUrls: ['./edit-agremiado.component.scss'],
})
export class EditAgremiadoComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  
  async close() {
    await this.modalCtrl.dismiss();
  }
}
