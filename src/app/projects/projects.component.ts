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
    newProject: Project;

    constructor(private service: PublicServicesService, private privService: PrivateServicesService) {
        super();
    }

    /**
     * Call a service to persist a new project
     */
    createProject(): void {
        this.privService.createProject(this.newProject)
            .pipe(
                this._scavenger.collect()
            )
            .subscribe(
                project => {
                    this.projects.push(project);
                    this.sucessMessage = `Le nouveau projet ${project.title} a bien été créé.`;
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
                },
                () => {
                    this.errorMessage = 'Une erreur est survenue lors de la création du nouveau projet.';
                    setInterval(() => {
                        this.errorMessage = undefined;
                    }, 7000);
                }
            );
    }

    /**
     * Call a service to persist modifications to an existing project.
     *
     * @param modifiedProject the modified version of an existing project
     */
    updateProject(modifiedProject: Project): void {
        this.privService.updateProject(modifiedProject)
            .pipe(
                this._scavenger.collect()
            )
            .subscribe(
                project => {
                    this.projects.filter(p => p.id === project.id).map(p => p = project);
                    this.sucessMessage = `Le projet ${project.title} a bien été modifié.`;
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
                },
                () => {
                    this.errorMessage = 'Une erreur est survenue lors de la modification du projet.';
                    setInterval(() => {
                        this.errorMessage = undefined;
                    }, 7000);
                }
            );
    }

    /**
     * Give the project ID to a service for removing it from the database.
     *
     * @param projectToDelete the project to delete from the database
     */
    deleteProject(projectToDelete: Project): void {
        this.privService.deleteProject(projectToDelete.id)
            .pipe(
                this._scavenger.collect()
            )
            .subscribe(
                () => {
                    this.getProjects();
                    this.sucessMessage = `Le projet ${projectToDelete.title} a bien été supprimé.`;
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
                },
                () => {
                    this.errorMessage = 'Une erreur est survenue lors de la suppression du projet.';
                    setInterval(() => {
                        this.errorMessage = undefined;
                    }, 7000);
                }
            );
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
                this.newProject = new Project('', '');
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

    ngOnDestroy(): void {
    }

}
