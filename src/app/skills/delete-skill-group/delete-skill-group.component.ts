import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { PrivateServicesService } from 'src/app/services/private-services.service';
import { SkillGroup } from 'src/app/models/SkillGroup';
import { Scavenger } from '@wishtack/rx-scavenger';

/**
 * Component for deleting a skill group and it's subsequent skills.
 */
@Component({
    selector: 'app-delete-skill-group',
    templateUrl: './delete-skill-group.component.html',
    styleUrls: ['./delete-skill-group.component.css'],
})
export class DeleteSkillGroupComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;

    @Input()
    skillGroup: SkillGroup;

    @Output()
    delete = new EventEmitter<string>(true);

    trash = faTrashAlt;

    constructor(private privService: PrivateServicesService) {}

    /**
     * Call a service to remove the selected skill group from the database.
     * All the skills in this group will be removed by the operation.
     */
    deleteGroup(): void {
        this.privService.deleteSkillGroup(this.skillGroup.id)
            .pipe(this._scavenger.collect())
            .subscribe(
                () => {
                    this.delete.emit('Le groupe de compétence a été supprimé avec succès.');
                },
                () => {
                    this.errorMessage =
                    'Une erreur est survenue durant la suppression du groupe de compétences.';
                    setInterval(() => {
                        this.errorMessage = undefined;
                    }, 7000);
                }
            );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
