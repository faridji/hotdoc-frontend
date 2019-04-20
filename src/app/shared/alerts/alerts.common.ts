import { Subject } from 'rxjs';

export class AlertAction
{
    alert: Alert;
    positive: boolean;
    value?: any;

    constructor(alert: Alert, positive: boolean, value?: string)
    {
        this.alert = alert;
        this.positive = positive;
        this.value = value;
    }
}

type alertType = 'success' | 'error' | 'info' | 'warning' | 'confirm' | 'confirmWithInput';

export class Alert
{
    type: alertType;
    title: string;
    message: string;
    required: boolean;

    icon?: string;
    iconText?: string;

    positive?: string;
    negative?: string;
    placeholder?: string;

    subject: Subject<AlertAction>

    constructor(type: alertType, title: string, message?: string, required?: boolean)
    {
        this.subject = new Subject<AlertAction>();
        this.title = title;
        this.message = message;
        this.type = type;
        this.required = required === void 0 ? true : required;

        switch(this.type)
        {
            case 'success':
                this.icon = 'done';
                this.positive = 'OK';
                break;
            case 'error':
                this.icon = 'clear';
                this.positive = 'OK';
                break;
            case 'info':
                this.iconText = 'i';
                this.positive = 'OK';
                break;
            case 'warning':
                this.iconText = '!';
                this.positive = 'OK';
                break;
            case 'confirm':
                this.iconText = '?';
                this.positive = 'Yes';
                this.negative = 'Cancel';
                break;
            case 'confirmWithInput':
                this.iconText = '?';
                this.positive = 'Yes';
                this.negative = 'Cancel';
                break;
        }
    }
}

