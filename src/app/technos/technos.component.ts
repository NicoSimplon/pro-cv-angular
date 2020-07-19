import { Component, OnInit } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { Techno } from '../models/Techno';

/**
 * Display the logos of the various technos used in both personnal and professionnal projects.
 */
@Component({
    selector: 'app-technos',
    templateUrl: './technos.component.html',
    styleUrls: ['./technos.component.css']
})
export class TechnosComponent implements OnInit {

    technos: Techno[];

    constructor(private service: PublicServicesService) { }

    ngOnInit(): void {
        this.service.getTechnos().subscribe(
            technoList => {
                this.technos = technoList;
            },
            messageKo => {
                console.log(messageKo);
            }
        );
    }

}
