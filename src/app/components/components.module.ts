import { NewAgremiadoComponent } from "./new-agremiado/new-agremiado.component";
import { EditAgremiadoComponent } from "./edit-agremiado/edit-agremiado.component";
import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudesComponent } from "./solicitudes/solicitudes.component";

@NgModule({
    declarations: [
      NewAgremiadoComponent,EditAgremiadoComponent,SolicitudesComponent
    ],
    imports: [
      CommonModule,
      IonicModule,
      FormsModule,
      ReactiveFormsModule
    ],
    exports: [
        NewAgremiadoComponent,EditAgremiadoComponent
    ]
  })
  export class ComponentsModule { }