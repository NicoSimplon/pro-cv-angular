import { Hobby } from './../../models/Hobby';
import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for updating an existing hobby.
 */
@Component({
    selector: 'app-update-hobby',
    templateUrl: './update-hobby.component.html',
    styleUrls: ['./update-hobby.component.css'],
})
export class UpdateHobbyComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    @Input()
    hobby: Hobby;

    @Output()
    update = new EventEmitter<Hobby>();

    @Output()
    delete = new EventEmitter<string>();

    constructor(private privService: PrivateServicesService) {}

    /**
     * Call a service to persist a new version of an existing hobby.
     */
    updateHobby(): void {
        this.privService.updateHobby(this.hobby).pipe(this._scavenger.collect()).subscribe(
            hobby => {
                this.sucessMessage = 'Le hobby a été modifié avec succès.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
                this.update.emit(hobby);
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la modification du hobby.';
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
    deleteHobby(message: string) {
        this.hobby = undefined;
        this.delete.emit(message);
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
