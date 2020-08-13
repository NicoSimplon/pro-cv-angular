import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { PrivateServicesService } from 'src/app/services/private-services.service';
import { Adress } from 'src/app/models/Adress';

/**
 * Component for updating the postal adress.
 */
@Component({
    selector: 'app-update-adress',
    templateUrl: './update-adress.component.html',
    styleUrls: ['./update-adress.component.css'],
})
export class UpdateAdressComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notification messages
    sucessMessage: string;
    errorMessage: string;

    @Input()
    adress: Adress;

    @Output()
    updateAddress = new EventEmitter<Adress>(true);

    constructor(private privService: PrivateServicesService) {}

    /**
     * Update the postal address
     */
    updateAdress(): void {
        this.privService.updateAdress(this.adress).pipe(this._scavenger.collect()).subscribe(
            (updatedAdress) => {
                this.adress = updatedAdress;
                this.sucessMessage =
                    'L\'adresse postale a bien été mise à jour.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
                this.updateAddress.emit(updatedAdress);
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la mise à jour de l\'adress postale.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
