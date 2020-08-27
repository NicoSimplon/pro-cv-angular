import { Component, OnInit, Input } from '@angular/core';
import { Hobby } from 'src/app/models/Hobby';

/**
 * Component for display an hobby.
 */
@Component({
    selector: 'app-hobby',
    templateUrl: './hobby.component.html',
    styleUrls: ['./hobby.component.css'],
})
export class HobbyComponent implements OnInit {

    @Input()
    hobby: Hobby;

    constructor() {}

    ngOnInit(): void {}

}
