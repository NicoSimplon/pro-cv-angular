import { SkillGroup } from './../../models/SkillGroup';
import { Component, OnInit, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { Skill } from 'src/app/models/Skill';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for creating a skill group and it's subsequent skills.
 */
@Component({
    selector: 'app-add-skill-group',
    templateUrl: './add-skill-group.component.html',
    styleUrls: ['./add-skill-group.component.css'],
})
export class AddSkillGroupComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    newSkillGroup = new SkillGroup('', []);
    newSkill = new Skill('');

    @Output()
    create = new EventEmitter<SkillGroup>(true);

    constructor(private privService: PrivateServicesService) {}

    /**
     * This method is a helper to add new skills to a new skill group.
     *
     * @param newSkill a new skill of the new skill group
     */
    createSkillInGroup(): void {
        const skill = new Skill(this.newSkill.title);
        this.newSkillGroup.skills.push(skill);
    }

    /**
     * Call a service to persist a new skill group.
     */
    createSkillGroup(): void {
        this.privService.createSkillGroup(this.newSkillGroup)
            .pipe(this._scavenger.collect())
            .subscribe(
                (skillGroup) => {
                    this.newSkillGroup = new SkillGroup('', []);
                    this.sucessMessage = `Le nouveau groupe de compétences ${skillGroup.title} a été créé avec succès.`;
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
                    this.create.emit(skillGroup);
                },
                () => {
                    this.errorMessage =
                        'Une erreur est survenue durant la création du groupe de compétences.';
                    setInterval(() => {
                        this.errorMessage = undefined;
                    }, 7000);
                }
            );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
