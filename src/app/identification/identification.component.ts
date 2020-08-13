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

    constructor(private service: PublicServicesService) {
        super();
    }

    /**
     * Update the photo path.
     */
    updatePhoto(photo: Photo): void {
        this.basicDatas.photoPath = photo.photoPath;
        this.photoPath = photo;
        this.completeUrl = `${environment.backendUrl}${photo.photoPath}`;
    }

    /**
     * Refresh the page to donwload the new photo.
     */
    updatePhotoImage(event: string): void {
        location.reload();
    }

    /**
     * Update the phone number
     */
    updatePhoneNumber(phone: Phone): void {
        this.phoneNumber = phone;
        this.basicDatas.phoneNumber = phone.phoneNumber;
    }

    /**
     * Update the postal address
     */
    updateAdress(adress: Adress): void {
        this.adress = adress;
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

    ngOnDestroy(): void {}
}
