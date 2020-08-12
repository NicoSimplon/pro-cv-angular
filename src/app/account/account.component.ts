import { ModifiedUser } from './../models/ModifiedUser';
import { LoggedUser } from './../models/LoggedUser';
import { PrivateServicesService } from './../services/private-services.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { AuthService } from '../services/auth.service';

/**
 * Account component to manage the user's login/password.
 */
@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    @Input()
    user: LoggedUser;
    modifiedUser = new ModifiedUser('', '', '');
    password: string;

    constructor(private auth: AuthService, private service: PrivateServicesService) {}

    /**
     * Call a service to update user email and/or password.
     */
    updateProfil(): void {
        this.service.updateUserLogins(this.modifiedUser).pipe(this._scavenger.collect()).subscribe(
            (profil) => {
                this.modifiedUser.actualEmail = profil.email;
                this.sucessMessage = 'Le profil a correctement été mis à jour.';
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
            },
            (error) => {
                if (error.status === 403 || error.status === 401) {
                    this.errorMessage = 'Vous ne pouvez pas accéder à ce service sans être authentifié.';
                } else {
                    this.errorMessage = 'Une erreur est survenue lors de la modification du profil.';
                }
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {
        if (this.user) {
            this.modifiedUser.actualEmail = this.user.email;
            this.modifiedUser.newEmail = this.user.email;
        }
    }

    ngOnDestroy(): void {}
}
