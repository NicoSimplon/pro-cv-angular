import { Component, OnInit } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { XpPro } from '../models/XpPro';

/**
 * Display the list of professionnal experiences.
 */
@Component({
    selector: 'app-experiences',
    templateUrl: './experiences.component.html',
    styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {

    experiences: XpPro[];

    constructor(private service: PublicServicesService) { }

    ngOnInit(): void {
        this.service.getXpPro().subscribe(
            xps => {
                this.experiences = xps;
            },
            messageKo => {
                console.log(messageKo);
            }
        );
    }

}
