import { Component, OnInit } from '@angular/core';
import { IdentificationDatas } from '../models/IdenthificationDatas';
import { PublicServicesService } from '../services/public-services.service';
import { Formation } from '../models/Formation';
import { PrivateServicesService } from '../services/private-services.service';
import { AuthService } from '../services/auth.service';
import { Authentification } from '../models/Authentification';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

    constructor(private service: PublicServicesService, private privService: PrivateServicesService, private authService: AuthService) { }

    ngOnInit(): void {

        // const log = new Authentification();
        // log.email = 'marty.nicolas11@laposte.net';
        // log.motDePasse = '#9899815';
        //this.authService.login(log).subscribe();
        //this.privService.createFormation(new Formation('Développeur Logiciel', 2018)).subscribe();
        //this.authService.logout().subscribe();
    }

}
