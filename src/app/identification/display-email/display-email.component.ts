import { Component, OnInit, Input } from '@angular/core';

/**
 * Component to display a way to mail me.
 */
@Component({
    selector: 'app-display-email',
    templateUrl: './display-email.component.html',
    styleUrls: ['./display-email.component.css'],
})
export class DisplayEmailComponent implements OnInit {

    @Input()
    email: string;

    constructor() {}

    ngOnInit(): void {}
}
