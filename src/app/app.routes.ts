import { Routes } from '@angular/router';
import { ConnexionGuardService } from './services/connexion-guard.service';
import { AccueilComponent } from './accueil/accueil.component';

export const ROUTES: Routes = [
    { path: 'accueil', component: AccueilComponent },
    // { path: 'galerie', canActivate: [ConnexionGuardService], component: GallerieComponent },
    // { path: 'apropos', canActivate: [ConnexionGuardService], component:  AProposComponent},
    // { path: 'galerie/:matricule', canActivate: [ConnexionGuardService], component: PhotoDetailComponent},
    // { path: 'profil', canActivate: [ConnexionGuardService], component: ProfilComponent },
    // { path: 'login', component: AuthentificationComponent },
    { path: '', pathMatch: 'full', redirectTo : '/accueil' },
    //{ path: '', canActivate: [ConnexionGuardService], pathMatch: 'full', redirectTo: '/login' }
];
