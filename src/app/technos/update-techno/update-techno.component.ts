import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { PrivateServicesService } from 'src/app/services/private-services.service';
import { Techno } from 'src/app/models/Techno';
import { environment } from 'src/environments/environment';
import { Scavenger } from '@wishtack/rx-scavenger';
import { ManageImage } from 'src/app/utils/manage-image';

/**
 * Component to update the techno title, path or
 * the logo image.
 */
@Component({
    selector: 'app-update-techno',
    templateUrl: './update-techno.component.html',
    styleUrls: ['./update-techno.component.css'],
})
export class UpdateTechnoComponent extends ManageImage implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notification messages
    sucessMessage: string;
    errorMessage: string;

    // Variables necessary to display or modify technos
    basicUrl = `${environment.backendUrl}`;

    @Input()
    techno: Techno;

    @Output()
    update = new EventEmitter<Techno>(true);

    @Output()
    updateLogoImage = new EventEmitter<string>(true);

    @Output()
    delete = new EventEmitter<string>(true);

    constructor(private privService: PrivateServicesService) {
        super();
    }

    /**
     * Update a techno logo path.
     */
    updateLogoPath(): void {
        this.privService.updateTechno(this.techno).pipe(this._scavenger.collect()).subscribe(
            (techno) => {
                this.sucessMessage = `La techno ${techno.title} a été mise à jour avec succès.`;
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
                this.update.emit(techno);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue durant la modification de la techno.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Update the logo of a techno.
     */
    updateImage(): void {
        this.formData.append('file', this.fileData);
        this.privService.updateImage(this.formData, this.techno.imageId).pipe(this._scavenger.collect()).subscribe(
            () => {
                this.updateLogoImage.emit('La photo de profil a été modifiée avec succès.');
            },
            () => {
                this.errorMessage = 'Une erreur est survenue durant la modification du logo.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Send a delete event to the mother component.
     *
     * @param message the notification message emit by the delete component
     */
    deleteTechno(message: string) {
        this.techno = undefined;
        this.delete.emit(message);
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
