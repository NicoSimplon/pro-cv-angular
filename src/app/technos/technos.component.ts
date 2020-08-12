import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { Techno } from '../models/Techno';
import { EditMode } from '../models/EditMode';
import { PrivateServicesService } from '../services/private-services.service';
import { environment } from 'src/environments/environment';
import { Scavenger } from '@wishtack/rx-scavenger';

/**
 * Display the logos of the various technos used in both personnal and professionnal projects.
 */
@Component({
    selector: 'app-technos',
    templateUrl: './technos.component.html',
    styleUrls: ['./technos.component.css']
})
export class TechnosComponent extends EditMode implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notification messages
    sucessMessage: string;
    errorMessage: string;

    technos: Techno[];

    constructor(private service: PublicServicesService) {
        super();
    }

    /**
     * Update the techno list after a nex one has been created.
     */
    addNewTechno(techno: Techno): void {
        this.technos.push(techno);
        this.technos.sort((a, b) => (a.order - b.order));
    }

    /**
     * Update the list of technos when one's path has been modified.
     */
    updateLogoPath(modifiedTechno: Techno): void {
        this.technos.filter(t => t.id === modifiedTechno.id).map(t => t = modifiedTechno);
        this.technos.sort((a, b) => (a.order - b.order));
    }

    /**
     * Delete a techno and his logo.
     *
     * @param techToDelete techno that will be deleted
     */
    deleteTechno(message: string): void {
        this.getTechnos();
        this.sucessMessage = message;
        setInterval(() => {
            this.sucessMessage = undefined;
        }, 7000);
    }

    /**
     * Reload the page after an image has been modified. Images are stored in browser cache
     * and the path of the image don't change. So it is necessary to reload
     * to see the new image displayed.
     */
    updateImage(message: string): void {
        location.reload();
        this.sucessMessage = message;
        setInterval(() => {
            this.sucessMessage = undefined;
        }, 7000);
    }

    /**
     * Get the complete list of technos stored
     * into the database
     */
    getTechnos(): void {
        this.service.getTechnos().pipe(this._scavenger.collect()).subscribe(
            technoList => {
                this.technos = technoList;
                this.technos.sort((a, b) => (a.order - b.order));
            },
            () => {
                this.errorMessage = 'Une erreur est survenue durant la récupération de la liste des technos.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {
        this.getTechnos();
    }

    ngOnDestroy(): void {}

}
