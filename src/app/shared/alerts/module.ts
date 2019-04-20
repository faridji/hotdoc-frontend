import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alerts.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-components/material-components.module';

@NgModule({
    declarations: [
      AlertComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    exports: [
        AlertComponent
    ],
    entryComponents: [
        AlertComponent
    ]
})
export class AlertsModule { }
