import { Component, Input, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Alert, AlertAction } from './alerts.common';


@Component({
    selector: 'hotdoc-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss'],

})
export class AlertComponent implements OnInit
{
    @Input() alert: Alert;

    theForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<AlertComponent>, private _fb: FormBuilder)
    {
        this.theForm = _fb.group({
            input: new FormControl(),
        });
    }

    ngOnInit(): void
    {
        if (this.alert.required)
            this.theForm.controls.input.setValidators([Validators.required]);
        else
            this.theForm.controls.input.setValidators(null);

    }

    @HostListener('window:keyup.esc') onKeyUp()
    {
        this.onNegative();
    }

    @HostListener('window:keyup.enter') onKeyUp2()
    {
        if (this.theForm.invalid) return;
        this.onPositive();
    }

    onPositive()
    {
        let r = new AlertAction(this.alert, true);

        if (this.alert.type === 'confirmWithInput')
            r = new AlertAction(this.alert, true, this.theForm.controls.input.value);

        this.dialogRef.close(r);
    }

    onNegative()
    {
        const r = new AlertAction(this.alert, false);

        this.dialogRef.close(r);
    }

    close()
    {
        this.dialogRef.close();
    }

}