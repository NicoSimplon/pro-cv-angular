import { Injectable } from '@angular/core';
import { LoggedUser } from '../models/LoggedUser';
import { Subject, Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Authentification } from '../models/Authentification';

/**
 * Authentication service to the back end private services.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    URL_BACKEND = `${environment.backendUrl}`;

    user = new Subject<LoggedUser>();

    connecte: boolean;

    constructor(private _http: HttpClient) { }

    login(auth: Authentification): Observable<LoggedUser> {
        return this._http.post<LoggedUser>(`${this.URL_BACKEND}/auth`, auth, { withCredentials: true })
            .pipe(
                tap(() => this.connecte = true)
            );
    }

    logout() {
        return this._http.post(`${this.URL_BACKEND}/logout`, null, { withCredentials: true })
            .pipe(
                tap(
                    ko => {
                        this.connecte = false;
                        localStorage.removeItem('AUTH-TOKEN');
                    }
                )
            );
    }

    getUser(): Observable<LoggedUser> {
        return this._http.get<LoggedUser>(`${this.URL_BACKEND}/me`, { withCredentials: true });
    }

    isLoggedIn(): Observable<boolean> {

        return this.getUser().pipe(
            tap(
                user => {
                    this.user.next(user);
                    this.connecte = true;
                }
            ),
            map(user => true)
        );
    }
}
