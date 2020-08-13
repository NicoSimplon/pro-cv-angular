import { ManageImage } from 'src/app/utils/manage-image';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { Photo } from 'src/app/models/Photo';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for updating the photo path that is stored in the database or
 * the photo itself that is also stored in the database.
 */
@Component({
    selector: 'app-update-photo',
    templateUrl: './update-photo.component.html',
    styleUrls: ['./update-photo.component.css'],
})
export class UpdatePhotoComponent extends ManageImage implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notification messages
    sucessMessage: string;
    errorMessage: string;

    @Input()
    photo: Photo;

    @Output()
    update = new EventEmitter<Photo>(true);

    @Output()
    updateImage = new EventEmitter<string>(true);

    constructor(private privService: PrivateServicesService) {
        super();
    }

    /**
     * Update the photo
     */
    updatePhoto(): void {
        this.privService.updatePhotoUrl(this.photo).pipe(this._scavenger.collect()).subscribe(
            (photo) => {
                this.sucessMessage =
                    'Le chemin de la photo a été mis à jour avec succès.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
                this.update.emit(photo);
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la mise à jour du chemin de la photo de profil.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Send a new image to change the one stored in database as the profile  photo.
     */
    updatePhotoImage(): void {
        this.formData.append('file', this.fileData);
        this.privService.updateImage(this.formData, this.photo.imageId).pipe(this._scavenger.collect()).subscribe(
            () => {
                this.sucessMessage = 'La photo de profil a été modifiée avec succès.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
                this.updateImage.emit('image mise à jour');
            },
            () => {
                this.errorMessage = 'Une erreur est survenu durant le téléchargement, réessayez plus tard.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
