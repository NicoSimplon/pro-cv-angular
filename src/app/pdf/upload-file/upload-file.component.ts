import { PrivateServicesService } from 'src/app/services/private-services.service';
import { ManageImage } from 'src/app/utils/manage-image';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';

/**
 * Component for uploading a new version of the CV into
 *  the back end part of the application and to persist it.
 */
@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent extends ManageImage implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notification messages
    sucessMessage: string;
    errorMessage: string;

    constructor(private service: PrivateServicesService) {
        super();
    }

    /**
     * Upload the new PDF version of the CV for persistance.
     */
    uploadPdf(): void {
        this.formData.append('file', this.fileData);
        this.service.updateImage(this.formData, 27).pipe(this._scavenger.collect()).subscribe(
            () => {
              this.sucessMessage = 'Le nouveau PDF a été téléchargé avec succès.';
              setInterval(() => {
                this.sucessMessage = undefined;
            }, 7000);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue durant le téléchargement du PDF.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}

}
