import { PrivateServicesService } from 'src/app/services/private-services.service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { Phone } from 'src/app/models/Phone';

/**
 * Component for updating the phone number.
 */
@Component({
    selector: 'app-update-phone',
    templateUrl: './update-phone.component.html',
    styleUrls: ['./update-phone.component.css'],
})
export class UpdatePhoneComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notification messages
    sucessMessage: string;
    errorMessage: string;

    @Input()
    phone: Phone;

    @Output()
    updateNum = new EventEmitter<Phone>(true);

    constructor(private privService: PrivateServicesService) {}

    /**
     * Update the phone number
     */
    updatePhoneNumber(): void {
        this.privService.updatePhoneNumber(this.phone).pipe(this._scavenger.collect()).subscribe(
            (updatedPhone) => {
                this.phone = updatedPhone;
                this.sucessMessage =
                    'Le numéro de téléphone a été mis à jour avec succès.';
                setInterval(() => {
                   this.sucessMessage = undefined;
                }, 7000);
                this.updateNum.emit(updatedPhone);
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la mise à jour du numéro de téléphone.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
