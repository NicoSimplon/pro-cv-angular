import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { Formation } from '../models/Formation';
import { EditMode } from '../models/EditMode';
import { PrivateServicesService } from '../services/private-services.service';
import { Scavenger } from '@wishtack/rx-scavenger';

/**
 * Display the list of formations.
 */
@Component({
    selector: 'app-formations',
    templateUrl: './formations.component.html',
    styleUrls: ['./formations.component.css']
})
export class FormationsComponent extends EditMode implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    formations: Formation[];

    constructor(private service: PublicServicesService) {
        super();
    }

    /**
     * Update the list of formations when a new one is created.
     */
    createFormation(newFormation: Formation): void {
        this.formations.push(newFormation);
        this.formations.sort((a, b) => (b.year - a.year));
    }

    /**
     * Update the list of formations after an existing one has been modified.
     */
    updateFormation(modifiedFormation: Formation): void {

        this.formations.filter(f => f.id === modifiedFormation.id)
            .map(f => f = modifiedFormation);

        this.formations.sort((a, b) => (b.year - a.year));
    }

    /**
     * Update the formations list after one is deleted.
     */
    deleteFormation(message: string): void {
        this.getFormations();
        this.sucessMessage = message;
        setInterval(() => {
            this.sucessMessage = undefined;
        }, 7000);
    }

    /**
     * Get the complete list of formations
     */
    getFormations(): void {
        this.service.getFormations().pipe(this._scavenger.collect()).subscribe(
            formations => {
                this.formations = formations;
                this.formations.sort((a, b) => (b.year - a.year));
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la récupération des formations.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {
        this.getFormations();
    }

    ngOnDestroy(): void {}

}
