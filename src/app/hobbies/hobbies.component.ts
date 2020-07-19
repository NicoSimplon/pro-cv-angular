import { Component, OnInit } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { Hobby } from '../models/Hobby';

/**
 * Display the list of hobbies.
 */
@Component({
    selector: 'app-hobbies',
    templateUrl: './hobbies.component.html',
    styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {

    hobbies: Hobby[];

    constructor(private service: PublicServicesService) { }

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
