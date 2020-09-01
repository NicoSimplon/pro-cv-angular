import { Component, OnInit } from '@angular/core';

/**
 * Component to manage the print display of the CV.
 */
@Component({
    selector: 'app-print',
    templateUrl: './print.component.html',
    styleUrls: ['./print.component.css'],
})
export class PrintComponent implements OnInit {

    title = 'Ingénieur d\'étude et développement Java';

    constructor() {}

    ngOnInit(): void {}
}
