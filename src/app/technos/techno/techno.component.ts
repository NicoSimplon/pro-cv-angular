import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Techno } from 'src/app/models/Techno';

/**
 * Component for displaying a techno logo.
 */
@Component({
    selector: 'app-techno',
    templateUrl: './techno.component.html',
    styleUrls: ['./techno.component.css'],
})
export class TechnoComponent implements OnInit {

    basicUrl = `${environment.backendUrl}`;

    @Input()
    techno: Techno;

    constructor() {}

    ngOnInit(): void {}
}
