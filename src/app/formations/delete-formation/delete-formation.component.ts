import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { Formation } from 'src/app/models/Formation';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for deleting a formation.
 */
@Component({
    selector: 'app-delete-formation',
    templateUrl: './delete-formation.component.html',
    styleUrls: ['./delete-formation.component.css'],
})
export class DeleteFormationComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;

    @Input()
    formation: Formation;

    @Output()
    delete = new EventEmitter<string>(true);

    constructor(private priService: PrivateServicesService) {}

    /**
     * Call a service to remove the selected formation in the database.
     */
    deleteFormation(): void {
        this.priService.deleteFormation(this.formation.id).pipe(this._scavenger.collect()).subscribe(
            () => {
                this.delete.emit(`La formation ${this.formation.title} a été supprimée avec succès.`);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la suppression de la formation.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
