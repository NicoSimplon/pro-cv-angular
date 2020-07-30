import { Routes } from '@angular/router';
import { ConnexionGuardService } from './services/connexion-guard.service';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';

export const ROUTES: Routes = [
    { path: 'accueil', component: AccueilComponent },
    // { path: 'galerie', canActivate: [ConnexionGuardService], component: GallerieComponent },
    // { path: 'apropos', canActivate: [ConnexionGuardService], component:  AProposComponent},
    // { path: 'galerie/:matricule', canActivate: [ConnexionGuardService], component: PhotoDetailComponent},
    // { path: 'profil', canActivate: [ConnexionGuardService], component: ProfilComponent },
    { path: 'edit', canActivate: [ConnexionGuardService], component: EditComponent },
    { path: 'login', component: LoginComponent },
    { path: '', pathMatch: 'full', redirectTo : '/accueil' },
];
