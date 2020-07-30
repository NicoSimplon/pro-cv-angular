import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Authentification } from '../models/Authentification';
import { LoggedUser } from '../models/LoggedUser';

/**
 * Login component. Authentication is required in order to use private services.
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    auth: Authentification = new Authentification();

    errorMessage: string;

    successMessage: string;

    constructor(private service: AuthService, private router: Router) {}

    /**
     * Login method to authenticate the user into the back end server.
     */
    connect() {
        this.service.login(this.auth).subscribe(
            (user) => {
                this.router.navigate(['/edit']);
            },
            (error) => {
                if (error.status === 403) {
                    this.errorMessage = 'Vos identifiants de connexion sont invalides.';
                } else {
                    this.errorMessage = 'Un problème est survenu. Veuillez réessayer plus tard.';
                }
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {
    }
}
