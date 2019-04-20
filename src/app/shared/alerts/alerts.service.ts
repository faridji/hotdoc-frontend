import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';

import { AlertComponent } from './alerts.component';
import { AlertAction, Alert } from './alerts.common';


@Injectable({
    providedIn: 'root'
})
export class AlertsService
{
    private static _instance: AlertsService = null;
    // public static shared(): RVAlertsService
    // {
    //     return RVAlertsService._instance;
    // }

    private alerts: Subject<Alert>;
    private queue: Alert[];
    private presented: boolean;

    constructor(protected dialog: MatDialog)
    {
        if (AlertsService._instance == null)
        {
            AlertsService._instance = this;
        }

        this.alerts = new Subject<Alert>();
        this.queue = [];
        this.presented = false;

        this.alerts.subscribe((a: Alert) =>
        {
            this.present(a);
        });
    }

    private present(alert: Alert)
    {
        this.presented = true;
        const dialogRef = this.dialog.open(AlertComponent, {
            disableClose: true,
            backdropClass: 'alert-backdrop'
        });
        dialogRef.componentInstance.alert = alert;

        dialogRef.afterClosed().subscribe((result: AlertAction) =>
        {
            this.presented = false;
            this.checkQueue();
            result.alert.subject.next(result);
            result.alert.subject.complete();
        });
    }

    private checkQueue()
    {
        if (this.queue.length == 0 || this.presented)
            return;
        // if (this.dialog.openDialogs.length > 0)
        //     return;

        this.alerts.next(this.queue.pop());
    }

    private addAlert(alert: Alert)
    {
        this.queue.push(alert);
        this.checkQueue();
    }

    public static success(title: string, message: string): Observable<AlertAction>
    {
        const alert = new Alert('success', title, message);
        AlertsService._instance.addAlert(alert);

        return alert.subject.asObservable();
    }

    public static error(title: string, message: string): Observable<AlertAction>
    {
        const alert = new Alert('error', title, message);
        AlertsService._instance.addAlert(alert);

        return alert.subject.asObservable();
    }

    public static apiError(title: string, error: any): Observable<AlertAction>
    {
        const alert = new Alert('error', title, error.ErrorMessage);
        AlertsService._instance.addAlert(alert);

        return alert.subject.asObservable();
    }

    public static info(title: string, message: string): Observable<AlertAction>
    {
        const alert = new Alert('info', title, message);
        AlertsService._instance.addAlert(alert);

        return alert.subject.asObservable();
    }

    public static warn(title: string, message: string): Observable<AlertAction>
    {
        const alert = new Alert('warning', title, message);
        AlertsService._instance.addAlert(alert);

        return alert.subject.asObservable();
    }

    public static confirm(title: string, message: string): Observable<AlertAction>
    {
        const alert = new Alert('confirm', title, message);
        AlertsService._instance.addAlert(alert);

        return alert.subject.asObservable();
    }

    public static confirmWithInput(title: string, label?: string, required?: boolean): Observable<AlertAction>
    {
        const alert = new Alert('confirmWithInput', title, '', required);
        alert.placeholder = label || title;
        AlertsService._instance.addAlert(alert);

        return alert.subject.asObservable();
    }

}