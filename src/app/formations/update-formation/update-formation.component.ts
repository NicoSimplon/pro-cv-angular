import { Formation } from './../../models/Formation';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for updating an existing formation.
 */
@Component({
    selector: 'app-update-formation',
    templateUrl: './update-formation.component.html',
    styleUrls: ['./update-formation.component.css'],
})
export class UpdateFormationComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    @Input()
    formation: Formation;

    @Output()
    update = new EventEmitter<Formation>(true);

    @Output()
    delete = new EventEmitter<string>(true);

    constructor(private priService: PrivateServicesService) {}

    /**
     * Call a service to persist the modified values of an existing formation.
     */
    updateFormation(): void {
        this.priService.updateFormation(this.formation).pipe(this._scavenger.collect()).subscribe(
            (formation) => {
                this.sucessMessage =
                    `La formation ${formation.title} a été modifiée avec succès.`;
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
                this.update.emit(formation);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la modification de la formation.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Send the delete event to the mother component.
     *
     * @param message the notification message sent by the delete component
     */
    deleteFormation(message: string) {
        this.formation = undefined;
        this.delete.emit(message);
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}

}
