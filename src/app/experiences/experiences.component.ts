import { Component, OnInit } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { XpPro } from '../models/XpPro';
import { EditMode } from '../models/EditMode';

/**
 * Display the list of professionnal experiences.
 */
@Component({
    selector: 'app-experiences',
    templateUrl: './experiences.component.html',
    styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent extends EditMode implements OnInit {

    experiences: XpPro[];

    constructor(private service: PublicServicesService) {
        super();
    }

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
