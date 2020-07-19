import { Component, OnInit } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { IdentificationDatas } from '../models/IdenthificationDatas';
import { Adress } from '../models/Adress';

/**
 * This component gather together the basic information about the CV (ID, adress, ...)
 */
@Component({
    selector: 'app-identification',
    templateUrl: './identification.component.html',
    styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {

    basicDatas: IdentificationDatas;
    adress: Adress;

    constructor(private service: PublicServicesService) { }

    ngOnInit(): void {

        // email, firstName, lastName, birthDate, phoneNumber
        this.service.getBasicDatas().subscribe(
            datas => {
                this.basicDatas = datas;
            },
            messageKo => {
                console.log(messageKo);
            }
        );

        // adress
        this.service.getAdress().subscribe(
            adress => {
                this.adress = adress;
            },
            messageKo => {
                console.log(messageKo);
            }
        );
    }

}
