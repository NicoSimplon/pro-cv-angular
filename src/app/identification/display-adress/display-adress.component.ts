import { Adress } from './../../models/Adress';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Component for displaying the postal adress.
 */
@Component({
    selector: 'app-display-adress',
    templateUrl: './display-adress.component.html',
    styleUrls: ['./display-adress.component.css'],
})
export class DisplayAdressComponent implements OnInit {

    @Input()
    adress: Adress;

    constructor() {}

    ngOnInit(): void {}
}
