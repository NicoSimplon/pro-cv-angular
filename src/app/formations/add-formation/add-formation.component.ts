import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { Formation } from 'src/app/models/Formation';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for creating a new Formation.
 */
@Component({
    selector: 'app-add-formation',
    templateUrl: './add-formation.component.html',
    styleUrls: ['./add-formation.component.css'],
})
export class AddFormationComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    newFormation = new Formation('', new Date().getFullYear());

    @Output()
    create = new EventEmitter<Formation>(true);

    constructor(private priService: PrivateServicesService) {}

    /**
     * Call a service to persist the new Formation
     * and then add it to the list for displaying it.
     */
    createFormation(): void {
        this.priService.createFormation(this.newFormation).pipe(this._scavenger.collect()).subscribe(
            (formation) => {
                this.sucessMessage =
                    `La formation ${formation.title} a été créée avec succès.`;
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
                this.create.emit(formation);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la création de la nouvelle formation.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
