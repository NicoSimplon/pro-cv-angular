import { EmailMessage } from './../../models/EmailMessage';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { PublicServicesService } from 'src/app/services/public-services.service';

/**
 * Component to display a way to mail me.
 */
@Component({
    selector: 'app-display-email',
    templateUrl: './display-email.component.html',
    styleUrls: ['./display-email.component.css'],
})
export class DisplayEmailComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notification messages
    sucessMessage: string;
    errorMessage: string;

    message = new EmailMessage('', '', '');

    constructor(private service: PublicServicesService) {}

    /**
     * Call a service and send the message from the visitor to my personal email box.
     */
    sendMail(): void {
        this.sucessMessage = undefined;
        this.errorMessage = undefined;
        this.service.sendEmail(this.message).pipe(this._scavenger.collect())
            .subscribe(
                () => {
                    this.sucessMessage = 'Merci pour votre message. J\'y répondrai dès que possible.';
                    this.message = new EmailMessage('', '', '');
                },
                () => {
                    this.errorMessage = 'Une erreur est survenue lors de l\'envoie de votre message.\n'
                    + 'Veuillez nous excuser pour le désagrément et réessayer plus tard.';
                }
            );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
