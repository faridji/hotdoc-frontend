import { Component, OnInit, Input, HostListener } from "@angular/core";
import { RVAlertAction, RVAlert } from "../alerts.common";
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup
} from "@angular/forms";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent implements OnInit {
  @Input() alert: RVAlert;

  theForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AlertComponent>,
    private _fb: FormBuilder) {
    this.theForm = _fb.group({
      input: new FormControl()
    });
  }

  ngOnInit(): void {
    if (this.alert.required)
      this.theForm.controls.input.setValidators([Validators.required]);
    else this.theForm.controls.input.setValidators(null);
  }

  @HostListener("window:keyup.esc") onKeyUp() {
    this.onNegative();
  }

  @HostListener("window:keyup.enter") onKeyUp2() {
    if (this.theForm.invalid) return;
    this.onPositive();
  }

  onPositive() {
    let r = new RVAlertAction(this.alert, false);

    if (this.alert.type === "confirmWithInput")
      r = new RVAlertAction(
        this.alert,
        true,
        this.theForm.controls.input.value
      );

    this.dialogRef.close(r);
  }

  onNegative() {
    const r = new RVAlertAction(this.alert, false);

    this.dialogRef.close(r);
  }

  close() {
    this.dialogRef.close();
  }
}
