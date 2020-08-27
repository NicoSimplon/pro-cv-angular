import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoggedUser } from './models/LoggedUser';
import { Scavenger } from '@wishtack/rx-scavenger';

/**
 * Basic component for the application
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    title = 'Ingénieur d\'étude et développement Java';

    user: LoggedUser;

    constructor(private service: AuthService) {}

    /**
     * Clean the user when logout of the application.
     */
    disconnect(event: boolean): void {
        this.user = null;
    }

    ngOnInit(): void {
        this.service.user.pipe(this._scavenger.collect()).subscribe(
            (user) => (this.user = user),
            () => (this.user = null)
        );
    }

    ngOnDestroy(): void {}
}
