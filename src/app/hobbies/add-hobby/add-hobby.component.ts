import { PrivateServicesService } from './../../services/private-services.service';
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { Hobby } from 'src/app/models/Hobby';

/**
 * Hobby creation component.
 */
@Component({
    selector: 'app-add-hobby',
    templateUrl: './add-hobby.component.html',
    styleUrls: ['./add-hobby.component.css'],
})
export class AddHobbyComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    newHobby = new Hobby('', '');

    @Output()
    create = new EventEmitter<Hobby>(true);

    constructor(private privService: PrivateServicesService) {}

    /**
     * Create a new Hobby and call a service to persist it.
     */
    createHobby(): void {
        this.privService.createHobby(this.newHobby).pipe(this._scavenger.collect()).subscribe(
            (hobby) => {
                this.sucessMessage = 'Le nouveau hobby a été créé avec succès.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
                this.create.emit(hobby);
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la création du nouveau hobby.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnDestroy(): void {}
    ngOnInit(): void {}
}
