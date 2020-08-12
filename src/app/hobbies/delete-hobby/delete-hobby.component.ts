import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { Hobby } from 'src/app/models/Hobby';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for deleting an hobby.
 */
@Component({
    selector: 'app-delete-hobby',
    templateUrl: './delete-hobby.component.html',
    styleUrls: ['./delete-hobby.component.css'],
})
export class DeleteHobbyComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;

    @Input()
    hobby: Hobby;

    @Output()
    delete = new EventEmitter<string>(true);

    constructor(private privService: PrivateServicesService) {}

    /**
     * Call a service and provide it with an ID of the hobby that has to be removed in the database.
     */
    deleteHobby(): void {
        this.privService.deleteHobby(this.hobby.id).pipe(this._scavenger.collect()).subscribe(
            () => {
                this.delete.emit('Le hobby a été supprimé avec succès.');
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la suppression du hobby.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
