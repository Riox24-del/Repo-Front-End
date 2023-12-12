import { Component, OnInit,Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/alert.service';
import { ServicioService } from 'src/app/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-agremiado',
  templateUrl: './edit-agremiado.component.html',
  styleUrls: ['./edit-agremiado.component.scss'],
})
export class EditAgremiadoComponent  implements OnInit {

  @Input() agremiadoId!: number;
  formGroup: FormGroup = this.formBuilder.group({
    apellidos: ['', Validators.required],
    nombre: ['', Validators.required],
    // Otros campos aquí
  });

  constructor(private modalCtrl: ModalController, private Ss: ServicioService,
    private fb: FormBuilder,private formBuilder: FormBuilder,
    private _alertService: AlertService) {

     }


     ngOnInit() {
    
    }

  async close() {
    await this.modalCtrl.dismiss();
  }


  submit() {
    // Asegurarte de que agremiadoId tenga un valor
    if (this.agremiadoId !== undefined) {
      this.Ss.updateAgremiado(this.agremiadoId, this.formGroup.value).subscribe(
        (response) => {
          console.log('Agremiado actualizado con éxito', response);
          this._alertService.generateToast({
            duration:800,  color: 'success', icon: 'checkmark-circle', 
            message: 'Miado Actualizado', position: 'bottom'
          })
        },
        (error) => {
          console.error('Error al actualizar agremiado', error);
          this._alertService.generateToast({
            duration:800,  color: 'danger', icon: 'close-circle', 
            message: 'Error al actualizar al miado', position: 'bottom'
          })
        }
      );
    } else {
      console.error('agremiadoId es undefined. No se puede realizar la actualización.');
    }
  }
  
}
