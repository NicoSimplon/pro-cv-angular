import { Component, OnInit } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { Formation } from '../models/Formation';

/**
 * Display the list of formations.
 */
@Component({
    selector: 'app-formations',
    templateUrl: './formations.component.html',
    styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {

    formations: Formation[];

    constructor(private service: PublicServicesService) { }

    ngOnInit(): void {
        this.service.getFormations().subscribe(
            formations => {
                this.formations = formations;
            },
            messageKo => {
                console.log(messageKo);
            }
        );
    }

}
