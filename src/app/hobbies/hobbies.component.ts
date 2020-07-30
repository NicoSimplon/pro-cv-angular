import { Component, OnInit } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { Hobby } from '../models/Hobby';
import { EditMode } from '../models/EditMode';

/**
 * Display the list of hobbies.
 */
@Component({
    selector: 'app-hobbies',
    templateUrl: './hobbies.component.html',
    styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent extends EditMode implements OnInit {

    hobbies: Hobby[];

    constructor(private service: PublicServicesService) {
        super();
    }

    ngOnInit(): void {
        this.service.getHobby().subscribe(
            hobbyList => {
                this.hobbies = hobbyList;
            },
            messageKo => {
                console.log(messageKo);
            }
        );
    }

}
