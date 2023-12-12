import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicioService } from 'src/app/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-new-agremiado',
  templateUrl: './new-agremiado.component.html',
  styleUrls: ['./new-agremiado.component.scss'],
})
export class NewAgremiadoComponent  implements OnInit {

  formProduct!: FormGroup;

  constructor(   private modalCtrl: ModalController, 
    private Ss: ServicioService, 
     private fb: FormBuilder,   private _alertService: AlertService) {
      
    this.formProduct = this.fb.group({
      apellidos: [ , Validators.required],
      nombre: [ , Validators.required],
      sexo: [ , Validators.required],
      NUP: [ , Validators.required],
      NUE: [ , Validators.required],
      RFC: [ , Validators.required],
      NSS: [ , Validators.required],
      f_nacimiento: [ , Validators.required],
      telefono: [0, Validators.required],
      cuota: [0, Validators.required]
    });
   }

  ngOnInit() {}


  async close() {
    await this.modalCtrl.dismiss();
  }


  submit(){
    console.log(this.formProduct.errors);
    const formdata =  new FormData();
    let data = this.formProduct.getRawValue();

    for(const dataKey in data){
      formdata.append(dataKey, data[dataKey]);
    }

    console.log('Formdata', formdata)

    console.log(data);

   //kaks
   this.Ss.newAgremiado(formdata).subscribe((resp: any) => {
    console.log(resp);
    this._alertService.generateToast({
      duration:800,  color: 'primary', icon: 'man', 
      message: 'Agremiado agregado', position: 'bottom'
    })
  }); 
  }

}
