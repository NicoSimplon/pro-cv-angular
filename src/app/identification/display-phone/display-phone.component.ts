import { Phone } from './../../models/Phone';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Component to display the phone number.
 */
@Component({
    selector: 'app-display-phone',
    templateUrl: './display-phone.component.html',
    styleUrls: ['./display-phone.component.css'],
})
export class DisplayPhoneComponent implements OnInit {

    @Input()
    phone: Phone;

    @Input()
    phoneIcon: any;

    constructor() {}

    ngOnInit(): void {}
}
