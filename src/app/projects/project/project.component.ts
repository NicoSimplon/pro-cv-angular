import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/Project';

/**
 * Component for displaying a project.
 */
@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {

    @Input()
    project: Project;

    constructor() {}

    ngOnInit(): void {}
}
