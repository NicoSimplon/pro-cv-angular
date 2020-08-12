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

    hobbies: Hobby[];

    constructor(private service: PublicServicesService) {
        super();
    }

    /**
     * Update the list of hobbies when a create event is thrown.
     */
    createHobby(event: Hobby): void {
        this.hobbies.push(event);
    }

    /**
     * After an hobby has been updated and the update event is received,
     * the list oh hobbies is updated.
     *
     * @param modifiedHobby The modified version of the hobby
     */
    updateHobby(modifiedHobby: Hobby): void {
        this.hobbies.filter(h => h.id === modifiedHobby.id).map(h => h = modifiedHobby);
    }

    /**
     * When a delete event is thronw, the list of hobbies is refresh
     * and a success notification is displayed.
     */
    deleteHobby(message: string): void {
        this.getHobbies();
        this.sucessMessage = message;
        setInterval(() => {
            this.sucessMessage = undefined;
        }, 7000);
    }

    /**
     * Get the complete list of hobbies for displaying them
     */
    getHobbies(): void {
        this.service.getHobby().pipe(this._scavenger.collect()).subscribe(
            (hobbyList) => {
                this.hobbies = hobbyList;
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

    ngOnDestroy(): void {}

}
