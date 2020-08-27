import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { environment } from 'src/environments/environment';
import { PrivateServicesService } from 'src/app/services/private-services.service';
import { Techno } from 'src/app/models/Techno';

/**
 * Component for removing a techno and it's logo froma the database.
 */
@Component({
    selector: 'app-delete-techno',
    templateUrl: './delete-techno.component.html',
    styleUrls: ['./delete-techno.component.css'],
})
export class DeleteTechnoComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notification messages
    errorMessage: string;
    sucessMessage: string;

    // Variables necessary to display or modify technos
    basicUrl = `${environment.backendUrl}`;

    @Input()
    techno: Techno;

    @Output()
    delete = new EventEmitter<string>(true);

    trash = faTrashAlt;

    constructor(private privService: PrivateServicesService) {}

    /**
     * Delete a techno and his logo.
     */
    deleteTechno(): void {
        this.privService.deleteTechno(this.techno.id).pipe(this._scavenger.collect()).subscribe(
            () => {
                this.privService.deleteImage(this.techno.imageId).pipe(this._scavenger.collect()).subscribe(
                    () => {
                        this.delete.emit(`La techno ${this.techno.title} a bien été supprimée.`);
                    },
                    () => {
                        this.errorMessage = 'Une erreur est survenue durant la suppression du logo.';
                        setInterval(() => {
                            this.errorMessage = undefined;
                        }, 7000);
                    }
                );
            },
            () => {
                this.errorMessage = 'Une erreur est survenue durant la suppression de la techno.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
