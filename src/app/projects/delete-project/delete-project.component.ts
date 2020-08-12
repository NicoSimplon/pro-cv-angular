import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { Scavenger } from '@wishtack/rx-scavenger';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for deleting a project.
 */
@Component({
    selector: 'app-delete-project',
    templateUrl: './delete-project.component.html',
    styleUrls: ['./delete-project.component.css'],
})
export class DeleteProjectComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    @Input()
    project: Project;

    @Output()
    delete = new EventEmitter<string>(true);

    constructor(private privService: PrivateServicesService) {}

    /**
     * Give the project ID to a service for removing it from the database.
     */
    deleteProject(): void {
        this.privService.deleteProject(this.project.id)
            .pipe(
                this._scavenger.collect()
            )
            .subscribe(
                () => {
                    this.delete.emit(`Le projet ${this.project.title} a bien été supprimé.`);
                },
                () => {
                    this.errorMessage = 'Une erreur est survenue lors de la suppression du projet.';
                    setInterval(() => {
                        this.errorMessage = undefined;
                    }, 7000);
                }
            );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
