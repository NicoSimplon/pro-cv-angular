import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { PrivateServicesService } from './../services/private-services.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { Project } from '../models/Project';
import { EditMode } from '../models/EditMode';
import { Scavenger } from '@wishtack/rx-scavenger';

/**
 * Display the list of the projects that i have been involved in.
 */
@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent extends EditMode implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    projects: Project[];

    selectedProject: Project;

    circle = faCircle;

    constructor(private service: PublicServicesService) {
        super();
    }

    /**
     * Update the list of projects after a new one has been created.
     */
    createProject(project: Project): void {
        this.projects.push(project);
    }

    /**
     * Update the list of projects when an existing one has been updated.
     */
    updateProject(project: Project): void {
        this.projects.filter(p => p.id === project.id).map(p => p = project);
    }

    /**
     * Refresh the list of project after on is deleted.
     */
    deleteProject(message: string): void {
        this.getProjects();
        this.sucessMessage = message;
        setInterval(() => {
            this.sucessMessage = undefined;
        }, 7000);
    }

    /**
     * Call a service to get the complete list of projects
     */
    getProjects(): void {
        this.service.getProject()
        .pipe(
            this._scavenger.collect()
        )
        .subscribe(
            projects => {
                this.projects = projects;
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la récupération des projets.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {
        this.getProjects();
    }

    ngOnDestroy(): void {}

}
