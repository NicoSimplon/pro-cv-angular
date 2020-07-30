import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LoggedUser } from '../models/LoggedUser';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * This menu component is used for login/logout purpose.
 */
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

    @Input()
    connected: boolean;

    errorMessage: string;

    @Output() deco = new EventEmitter();

    @Input()
    user: LoggedUser;

    constructor(private service: AuthService, private router: Router) {}

    disconnect() {
        this.service.logout().subscribe(
            () => {
                this.connected = false;
                this.user = undefined;
                this.deco.emit(true);
            },
            () => {
                this.connected = true;
                this.errorMessage = 'Une erreur est survenue et vous êtes toujours connecté.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
        this.router.navigate(['/accueil']);
    }

    ngOnInit(): void {
        this.service.user.subscribe(() => (this.connected = true));
    }
}
