import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoggedUser } from './models/LoggedUser';

/**
 * Basic component for the application
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    title = 'Ingénieur d\'étude et développement';

    user: LoggedUser;

    constructor(private service: AuthService) {}

    disconnect(event: boolean): void {
        this.user = null;
    }

    ngOnInit() {
        this.service.user.subscribe(
            (user) => (this.user = user),
            () => (this.user = null)
        );
    }
}
