import { XpPro } from './../../models/XpPro';
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for creating a nex professional experience.
 */
@Component({
    selector: 'app-add-new-xp',
    templateUrl: './add-new-xp.component.html',
    styleUrls: ['./add-new-xp.component.css'],
})
export class AddNewXpComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    newExperience = new XpPro('', '', '');

    @Output()
    create = new EventEmitter<XpPro>(true);

    constructor(private privService: PrivateServicesService) {}

    /**
     * Call a service to persist the new professional experience
     * and then add it to the list for displaying it.
     */
    createXp(): void {
        this.privService.createXp(this.newExperience).pipe(this._scavenger.collect()).subscribe(
            (xp) => {
                this.create.emit(xp);
                this.sucessMessage =
                    `L'expérience ${xp.title} a été créée avec succès.`;
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la création de la nouvelle expérience.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}
