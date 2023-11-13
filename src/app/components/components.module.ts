import { NewAgremiadoComponent } from "./new-agremiado/new-agremiado.component";
import { EditAgremiadoComponent } from "./edit-agremiado/edit-agremiado.component";
import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      NewAgremiadoComponent,EditAgremiadoComponent
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