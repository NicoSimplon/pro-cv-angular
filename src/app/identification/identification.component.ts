import { Component, OnInit, LOCALE_ID, OnDestroy } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { IdentificationDatas } from '../models/IdenthificationDatas';
import { Adress } from '../models/Adress';
import { EditMode } from '../models/EditMode';
import { PrivateServicesService } from '../services/private-services.service';
import { Photo } from '../models/Photo';
import { Phone } from '../models/Phone';
import { environment } from 'src/environments/environment';
import { Scavenger } from '@wishtack/rx-scavenger';

/**
 * This component gather together the basic information about the CV (ID, adress, ...)
 */
@Component({
    selector: 'app-identification',
    templateUrl: './identification.component.html',
    styleUrls: ['./identification.component.css'],
})
export class IdentificationComponent extends EditMode implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notification messages
    sucessMessage: string;
    errorMessage: string;

    // Variables to display my identification informations
    // or update it
    basicDatas: IdentificationDatas;
    adress: Adress;
    age: number;
    phoneNumber: Phone;
    photoPath: Photo;
    completeUrl: string;
    fileData: File = null;
    previewUrl: any = null;
    formData = new FormData();

    constructor(
        private service: PublicServicesService,
        private privService: PrivateServicesService
    ) {
        super();
    }

    /**
     * Update the photo
     */
    updatePhoto(): void {
        this.privService.updatePhotoUrl(this.photoPath).pipe(this._scavenger.collect()).subscribe(
            (photo) => {
                this.basicDatas.photoPath = photo.photoPath;
                this.photoPath.photoPath = photo.photoPath;
                this.sucessMessage =
                    'Le chemin de la photo a été mis à jour avec succès.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
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
        this.privService.updateImage(this.formData, this.photoPath.imageId).pipe(this._scavenger.collect()).subscribe(
            () => {
                location.reload(); // to reload the image stored in the browser cache
                this.sucessMessage = 'La photo de profil a été modifiée avec succès.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage = 'Une erreur est survenu durant le téléchargement, réessayez plus tard.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Display upload progress
     *
     */
    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0] as File;
        this.preview();
    }

    /**
     * Display the new image preview
     */
    preview() {
        const mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (_event) => {
            this.previewUrl = reader.result;
        };
    }

    /**
     * Update the phone number
     */
    updatePhoneNumber(): void {
        this.privService.updatePhoneNumber(this.phoneNumber).pipe(this._scavenger.collect()).subscribe(
            (updatedPhone) => {
                this.phoneNumber = updatedPhone;
                this.basicDatas.phoneNumber = updatedPhone.phoneNumber;
                this.sucessMessage =
                    'Le numéro de téléphone a été mis à jour avec succès.';
                setInterval(() => {
                   this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la mise à jour du numéro de téléphone.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Update the postal address
     */
    updateAdress(): void {
        this.privService.updateAdress(this.adress).pipe(this._scavenger.collect()).subscribe(
            (updatedAdress) => {
                this.adress = updatedAdress;
                this.sucessMessage =
                    'L\'adresse postale a bien été mise à jour.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la mise à jour de l\'adress postale.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Get the CV identification datas
     * (email, firstName, lastName, birthDate, phoneNumber, photo).
     */
    getDatas(): void {
        this.service.getBasicDatas().pipe(this._scavenger.collect()).subscribe(
            (datas) => {
                this.basicDatas = datas;
                this.photoPath = new Photo(this.basicDatas.photoPath);
                this.completeUrl = `${environment.backendUrl}${this.basicDatas.photoPath}`;
                this.phoneNumber = new Phone(datas.phoneNumber);
                // I display my age instead of my birth date
                // I calculate it so i don't have to update it manualy.
                this.age = Math.abs(
                    new Date(
                        Date.now() - new Date(datas.birthDate).getTime()
                    ).getUTCFullYear() - 1970
                );
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue lors de la récupération des données du profil.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Get the postal address.
     */
    getAdress(): void {
        this.service.getAdress().pipe(this._scavenger.collect()).subscribe(
            (adress) => {
                this.adress = adress;
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue lors de la récupération de l\'adresse.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {
        // Datas initialisation
        this.getDatas();
        this.getAdress();
    }

    ngOnDestroy(): void {
    }
}
