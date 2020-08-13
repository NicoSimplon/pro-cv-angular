import { SkillGroup } from './../../models/SkillGroup';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Component to display a skill group and it's subsequent skills.
 */
@Component({
    selector: 'app-skill-group-display',
    templateUrl: './skill-group-display.component.html',
    styleUrls: ['./skill-group-display.component.css'],
})
export class SkillGroupDisplayComponent implements OnInit {

    @Input()
    skillGroup: SkillGroup;

    constructor() {}

    ngOnInit(): void {}
}
