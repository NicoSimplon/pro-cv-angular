import { Component, OnInit, Output, Input, OnDestroy, EventEmitter } from '@angular/core';
import { LoggedUser } from '../models/LoggedUser';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Scavenger } from '@wishtack/rx-scavenger';
import { faEdit, faSignOutAlt, faHome, faUsers } from '@fortawesome/free-solid-svg-icons';

/**
 * This menu component is used for login/logout purpose.
 */
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    @Input()
    connected: boolean;

    errorMessage: string;

    @Output()
    deco = new EventEmitter();

    @Input()
    user: LoggedUser;

    profileVisible = false;
    public isMenuCollapsed = true;

    // FontAwesome icons
    edit = faEdit;
    logout = faSignOutAlt;
    home = faHome;
    profil = faUsers;

    loginPage = false;

    constructor(private service: AuthService, private router: Router) {}

    /**
     * Hide or show the link to go in edit mode.
     */
    setVisibility(): void {
        this.loginPage = !this.loginPage;
    }

    /**
     * Display the profile part
     */
    editUser(): void {
        this.profileVisible = !this.profileVisible;
    }

    /**
     * Logout of the application back end part
     * and redirect the user to the main page.
     */
    disconnect() {
        this.service.logout().pipe(this._scavenger.collect()).subscribe(
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

    /**
     * Check the private service to see if a user is defined.
     * If it is the user is loggued and the display of the menu
     * change.
     */
    getUser(): void {
        this.service.user.pipe(this._scavenger.collect()).subscribe(() => (this.connected = true));
        this.profileVisible = false;
    }

    ngOnInit(): void {
        this.getUser();
    }

    ngOnDestroy(): void {
    }
}
