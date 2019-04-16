import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Subject, Observable } from "rxjs";
import { RVAlertAction, RVAlert } from "./alerts.common";
import { AlertComponent } from "./alert/alert.component";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  private static _instance: AlertService = null;
  public static shared(): AlertService {
    return AlertService._instance;
  }

  private alerts: Subject<RVAlert>;
  private queue: RVAlert[];

  constructor(protected dialog: MatDialog) {
    if (AlertService._instance == null) {
      AlertService._instance = this;
    }

    this.alerts = new Subject<RVAlert>();
    this.queue = [];

    this.alerts.subscribe((a: RVAlert) => {
      this.present(a);
    });
  }

  private present(alert: RVAlert) {
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.alert = alert;

    dialogRef.afterClosed().subscribe((result: RVAlertAction) => {
      this.checkQueue();
      // result.alert.subject.next(result);
      // result.alert.subject.complete();
    });
  }

  private checkQueue() {
    if (this.queue.length == 0) return;
    if (this.dialog.openDialogs.length > 0) return;
    this.alerts.next(this.queue.pop());
  }

  success(title: string, message: string): Observable<RVAlertAction> {
    const alert = new RVAlert("success", title, message);

    this.queue.push(alert);
    this.checkQueue();

    return alert.subject.asObservable();
  }

  error(title: string, message: string): Observable<RVAlertAction> {
    const alert = new RVAlert("error", title, message);

    this.queue.push(alert);
    this.checkQueue();

    return alert.subject.asObservable();
  }

  info(title: string, message: string): Observable<RVAlertAction> {
    const alert = new RVAlert("info", title, message);

    this.queue.push(alert);
    this.checkQueue();

    return alert.subject.asObservable();
  }

  warn(title: string, message: string): Observable<RVAlertAction> {
    const alert = new RVAlert("warning", title, message);

    this.queue.push(alert);
    this.checkQueue();

    return alert.subject.asObservable();
  }

  confirm(title: string): Observable<RVAlertAction> {
    const alert = new RVAlert("confirm", title);

    this.queue.push(alert);
    this.checkQueue();

    return alert.subject.asObservable();
  }

  confirmWithInput(
    title: string,
    label?: string,
    required?: boolean
  ): Observable<RVAlertAction> {
    const alert = new RVAlert("confirmWithInput", title, "", required);
    alert.placeholder = label || title;

    this.queue.push(alert);
    this.checkQueue();

    return alert.subject.asObservable();
  }
}
