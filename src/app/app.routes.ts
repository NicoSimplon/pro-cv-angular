import { Routes } from '@angular/router';
import { ConnexionGuardService } from './services/connexion-guard.service';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
import { AccountComponent } from './account/account.component';

export const ROUTES: Routes = [
    { path: 'accueil', component: AccueilComponent },
    { path: 'edit', canActivate: [ConnexionGuardService], component: EditComponent },
    { path: 'account', canActivate: [ConnexionGuardService], component: AccountComponent },
    { path: 'login', component: LoginComponent },
    { path: '', pathMatch: 'full', redirectTo : '/accueil' },
];
