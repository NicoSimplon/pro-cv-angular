import { XpPro } from './../../models/XpPro';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

/**
 * Component for displaying a single professional experience.
 */
@Component({
    selector: 'app-xp',
    templateUrl: './xp.component.html',
    styleUrls: ['./xp.component.css'],
})
export class XpComponent implements OnInit, OnDestroy {

    @Input()
    experience: XpPro;

    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {}

}
