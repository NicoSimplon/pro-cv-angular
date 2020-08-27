import { ManageImage } from './../../utils/manage-image';
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { environment } from 'src/environments/environment';
import { Techno } from 'src/app/models/Techno';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for creating a new techno logo. It
 * is composed from a path and an image.
 */
@Component({
    selector: 'app-add-techno',
    templateUrl: './add-techno.component.html',
    styleUrls: ['./add-techno.component.css'],
})
export class AddTechnoComponent extends ManageImage implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notification messages
    sucessMessage: string;
    errorMessage: string;

    // Variables necessary to display or modify technos
    basicUrl = `${environment.backendUrl}`;
    newTechno = new Techno('', '', 2);

    @Output()
    create = new EventEmitter<Techno>(true);

    constructor(private privService: PrivateServicesService) {
        super();
    }

    /**
     * Create a new techno and associate it
     * with the new image (logo) that has been provided.
     */
    addNewTechno(): void {
        this.formData.append('file', this.fileData);
        this.privService.uploadImage(this.formData).pipe(this._scavenger.collect()).subscribe(
            (image) => {
                const newLogo = this.newTechno;
                newLogo.imageId = image.id;
                newLogo.logoPath = `/image/downloadFile/${newLogo.imageId}`;
                this.privService.createTechno(newLogo).pipe(this._scavenger.collect()).subscribe(
                    (techno) => {
                        this.previewUrl = null;
                        this.fileData = null;
                        this.formData = new FormData();
                        this.sucessMessage = 'La nouvelle techno a été créée avec succès.';
                        setInterval(() => {
                            this.sucessMessage = undefined;
                        }, 7000);
                        this.create.emit(techno);
                    },
                    () => {
                        this.errorMessage = 'Une erreur est survenue durant la création de la nouvelle techno.';
                        setInterval(() => {
                            this.errorMessage = undefined;
                        }, 7000);
                    }
                );
            },
            () => {
                this.errorMessage = 'Une erreur est survenue durant l\'upload du nouveau logo.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
