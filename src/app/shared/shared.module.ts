import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-components/material-components.module';
import { AlertComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule { }
