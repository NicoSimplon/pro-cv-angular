import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { PrivateServicesService } from 'src/app/services/private-services.service';
import { Project } from 'src/app/models/Project';

/**
 * Component for updating an existing project.
 */
@Component({
    selector: 'app-update-project',
    templateUrl: './update-project.component.html',
    styleUrls: ['./update-project.component.css'],
})
export class UpdateProjectComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    @Input()
    project: Project;

    @Output()
    update = new EventEmitter<Project>(true);

    constructor(private privService: PrivateServicesService) {}

    /**
     * Call a service to persist modifications to an existing project.
     */
    updateProject(): void {
        this.privService.updateProject(this.project)
            .pipe(
                this._scavenger.collect()
            )
            .subscribe(
                project => {
                    this.sucessMessage = `Le projet ${project.title} a bien été modifié.`;
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
                    this.update.emit(project);
                },
                () => {
                    this.errorMessage = 'Une erreur est survenue lors de la modification du projet.';
                    setInterval(() => {
                        this.errorMessage = undefined;
                    }, 7000);
                }
            );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}

}
