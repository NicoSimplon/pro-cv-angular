import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { Hobby } from '../models/Hobby';
import { EditMode } from '../models/EditMode';
import { PrivateServicesService } from '../services/private-services.service';
import { Scavenger } from '@wishtack/rx-scavenger';

/**
 * Display the list of hobbies.
 */
@Component({
    selector: 'app-hobbies',
    templateUrl: './hobbies.component.html',
    styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent extends EditMode implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    // Variables for displaying or editing hobbies
    hobbies: Hobby[];
    newHobby: Hobby;

    constructor(private service: PublicServicesService, private privService: PrivateServicesService) {
        super();
    }

    /**
     * Create a new Hobby and call a service to persist it.
     */
    createHobby(): void {
        this.privService.createHobby(this.newHobby).pipe(this._scavenger.collect()).subscribe(
            (hobby) => {
                this.hobbies.push(hobby);
                this.sucessMessage = 'Le nouveau hobby a été créé avec succès.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la création du nouveau hobby.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Call a service to persist a new version of an existing hobby.
     *
     * @param modifiedHobby The modified version of the hobby
     */
    updateHobby(modifiedHobby: Hobby): void {
        this.privService.updateHobby(modifiedHobby).pipe(this._scavenger.collect()).subscribe(
            hobby => {
                this.hobbies.filter(h => h.id === hobby.id).map(h => h = hobby);
                this.sucessMessage = 'Le hobby a été modifié avec succès.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la modification du hobby.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Call a service and provide it with an ID of the hobby that has to be removed in the database.
     *
     * @param hobbyToDelete Hobby object that contains the ID necessary to the operation
     */
    deleteHobby(hobbyToDelete: Hobby): void {
        this.privService.deleteHobby(hobbyToDelete.id).pipe(this._scavenger.collect()).subscribe(
            () => {
                this.getHobbies();
                this.sucessMessage = 'Le hobby a été supprimé avec succès.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la suppression du hobby.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    /**
     * Get the complete list of hobbies for displaying them
     */
    getHobbies(): void {
        this.service.getHobby().pipe(this._scavenger.collect()).subscribe(
            (hobbyList) => {
                this.hobbies = hobbyList;
                this.newHobby = new Hobby('', '');
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la récupération de la liste des hobbies. Réessayez plus tard.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {
        this.getHobbies();
    }

    ngOnDestroy(): void {
    }

}
