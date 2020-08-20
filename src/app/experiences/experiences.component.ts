import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { XpPro } from '../models/XpPro';
import { EditMode } from '../models/EditMode';
import { PrivateServicesService } from '../services/private-services.service';
import { Scavenger } from '@wishtack/rx-scavenger';

/**
 * Display the list of professionnal experiences.
 */
@Component({
    selector: 'app-experiences',
    templateUrl: './experiences.component.html',
    styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent extends EditMode implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    errorMessage: string;
    sucessMessage: string;

    experiences: XpPro[];

    circle = faCircle;

    constructor(private service: PublicServicesService) {
        super();
    }

    /**
     * Update the list of experiences after creating a new one.
     */
    addNewXp(event): void {
        this.experiences.push(event);
        this.experiences.sort((a, b) => (a.order - b.order));
    }

    /**
     * Update the list when an update event is thrown.
     */
    updateXp(event: XpPro): void {

        this.experiences.filter(e => e.id === event.id).map(e => e = event);
        this.experiences.sort((a, b) => (a.order - b.order));
    }

    /**
     * When get the delete event this method refresh the list of experiences.
     */
    deleteXp(event: string): void {
        this.getXp();
        this.sucessMessage = 'Une erreur est survenue lors de la récupération des expériences professionnelles.';
        setInterval(() => {
            this.sucessMessage = undefined;
        }, 7000);
    }

    /**
     * Call a service to retrieve the complete list of the professional experiences.
     */
    getXp(): void {
        this.service.getXpPro().pipe(this._scavenger.collect()).subscribe(
            xps => {
                this.experiences = xps;
                this.experiences.sort((a, b) => (a.order - b.order));
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la récupération des expériences professionnelles.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {
        this.getXp();
    }

    ngOnDestroy(): void {
    }

}
