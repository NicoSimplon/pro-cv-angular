import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { Formation } from '../models/Formation';
import { EditMode } from '../models/EditMode';
import { PrivateServicesService } from '../services/private-services.service';

/**
 * Display the list of formations.
 */
@Component({
    selector: 'app-formations',
    templateUrl: './formations.component.html',
    styleUrls: ['./formations.component.css']
})
export class FormationsComponent extends EditMode implements OnInit, OnDestroy {

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    // Variables for displaying and modifying formations
    formations: Formation[];
    newFormation: Formation;

    constructor(private service: PublicServicesService, private priService: PrivateServicesService) {
        super();
    }

    /**
     * Call a service to persist the new Formation
     * and then add it to the list for displaying it.
     */
    createFormation(): void {
        this.priService.createFormation(this.newFormation).subscribe(
            (formation) => {
                this.formations.push(formation);
                this.sucessMessage =
                    `La formation ${formation.title} a été créée avec succès.`;
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la création de la nouvelle formation.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Call a service to persist the modified values of an existing formation.
     *
     * @param modifiedFormation the modified version of the Formation
     */
    updateFormation(modifiedFormation: Formation): void {
        this.priService.updateFormation(modifiedFormation).subscribe(
            (formation) => {
                this.formations.forEach(
                    f => {
                        if (formation.id === f.id) {
                            f = formation;
                        }
                    }
                );
                this.sucessMessage =
                    `La formation ${formation.title} a été modifiée avec succès.`;
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
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
     * Call a service to remove the selected formation in the database.
     *
     * @param formation the formation to delete (we need it's ID)
     */
    deleteFormation(formation: Formation): void {
        this.priService.deleteFormation(formation.id).subscribe(
            () => {
                this.getFormations();
                this.sucessMessage =
                    `La formation ${formation.title} a été supprimée avec succès.`;
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la suppression de la formation.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Get the complete list of formations
     */
    getFormations(): void {
        this.service.getFormations().subscribe(
            formations => {
                this.formations = formations;
                this.formations.sort((a, b) => (b.year - a.year));
                this.newFormation = new Formation('', new Date().getFullYear());
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

    ngOnDestroy(): void {
        // unsubscribe Observable objects

    }

}
