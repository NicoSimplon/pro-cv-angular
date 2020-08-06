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

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    experiences: XpPro[];
    newExperience: XpPro;

    constructor(private service: PublicServicesService, private privService: PrivateServicesService) {
        super();
    }

    /**
     * Call a service to persist the new professional experience
     * and then add it to the list for displaying it.
     */
    createXp(): void {
        this.privService.createXp(this.newExperience).pipe(this._scavenger.collect()).subscribe(
            (xp) => {
                this.experiences.push(xp);
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

    /**
     * Call a service to persist the modified values of an existing professional experience.
     *
     * @param modifiedXp the modified version of the professional experience
     */
    updateXp(modifiedXp: XpPro): void {
        this.privService.updateXp(modifiedXp).pipe(this._scavenger.collect()).subscribe(
            (xp) => {
                this.experiences.filter(e => e.id === xp.id).map(e => e = xp);
                this.sucessMessage =
                    `L'expérience ${xp.title} a été modifiée avec succès.`;
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la modification de l\'expérience professionnelle.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Call a service to remove the selected professional experience in the database.
     *
     * @param xp the XpPro to delete (we need it's ID)
     */
    deleteXp(xp: XpPro): void {
        this.privService.deleteXp(xp.id).pipe(this._scavenger.collect()).subscribe(
            () => {
                this.getXp();
                this.sucessMessage =
                    `L'expérience professionnelle ${xp.title} a été supprimée avec succès.`;
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la suppression de l\'expérience professionnelle.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Call a service to retrieve the complete list of the professional experiences.
     */
    getXp(): void {
        this.service.getXpPro().pipe(this._scavenger.collect()).subscribe(
            xps => {
                this.experiences = xps;
                this.newExperience = new XpPro('', '', '');
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
