import { Project } from './../../models/Project';
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for creating a new project.
 */
@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    newProject = new Project('', '');

    @Output()
    create = new EventEmitter<Project>(true);

    constructor(private privService: PrivateServicesService) {}

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
                    this.sucessMessage = `Le nouveau projet ${project.title} a bien été créé.`;
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
                    this.create.emit(project);
                },
                () => {
                    this.errorMessage = 'Une erreur est survenue lors de la création du nouveau projet.';
                    setInterval(() => {
                        this.errorMessage = undefined;
                    }, 7000);
                }
            );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
