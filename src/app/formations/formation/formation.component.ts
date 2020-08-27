import { Component, OnInit, Input } from '@angular/core';
import { Formation } from 'src/app/models/Formation';

/**
 * Component for displaying a formation.
 */
@Component({
    selector: 'app-formation',
    templateUrl: './formation.component.html',
    styleUrls: ['./formation.component.css'],
})
export class FormationComponent implements OnInit {

    @Input()
    formation: Formation;

    constructor() {}

    ngOnInit(): void {}
}
