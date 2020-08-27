import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { XpPro } from './../../models/XpPro';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for deleting a professional experience.
 */
@Component({
    selector: 'app-delete-xp',
    templateUrl: './delete-xp.component.html',
    styleUrls: ['./delete-xp.component.css'],
})
export class DeleteXpComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;

    @Input()
    experience: XpPro;

    @Output()
    delete = new EventEmitter<string>(true);

    trash = faTrashAlt;

    constructor(private privService: PrivateServicesService) {}

    /**
     * Call a service to remove the selected professional experience in the database.
     */
    deleteXp(): void {
        this.privService.deleteXp(this.experience.id).pipe(this._scavenger.collect()).subscribe(
            () => {
                this.delete.emit(`L'expérience professionnelle ${this.experience.title} a été supprimée avec succès.`);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la suppression de l\'expérience professionnelle.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
