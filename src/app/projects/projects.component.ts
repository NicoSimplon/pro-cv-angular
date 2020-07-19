import { Component, OnInit } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { Project } from '../models/Project';

/**
 * Display the list of the projects that i have been involved in.
 */
@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    projects: Project[];

    constructor(private service: PublicServicesService) { }

    ngOnInit(): void {
        this.service.getProject().subscribe(
            projects => {
                this.projects = projects;
            },
            messageKo => {
                console.log(messageKo);
            }
        );
    }

}
