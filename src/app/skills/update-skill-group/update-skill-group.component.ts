import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { PrivateServicesService } from 'src/app/services/private-services.service';
import { Skill } from 'src/app/models/Skill';
import { SkillGroup } from 'src/app/models/SkillGroup';
import { Scavenger } from '@wishtack/rx-scavenger';

/**
 * Component for updating a skill group and it's subsequent skills.
 * It can also add a new skill to the selected skill group.
 */
@Component({
    selector: 'app-update-skill-group',
    templateUrl: './update-skill-group.component.html',
    styleUrls: ['./update-skill-group.component.css'],
})
export class UpdateSkillGroupComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    newAloneSkill = new Skill('');

    @Input()
    skillGroup: SkillGroup;

    @Output()
    updateGroup = new EventEmitter<SkillGroup>(true);

    @Output()
    createSkill = new EventEmitter<Skill>(true);

    @Output()
    deleteASkill = new EventEmitter<SkillGroup>(true);

    constructor(private privService: PrivateServicesService) {}

    /**
     * Create a new skill in an existing skill group.
     */
    createSkillAlone() {
        this.privService.createSkill(this.newAloneSkill, this.skillGroup.id)
            .pipe(this._scavenger.collect())
            .subscribe(
                s => {
                    this.skillGroup.skills.push(s);
                    this.sucessMessage = `La compétence << ${s.title} >> a été ajoutée au groupe.`;
                    this.createSkill.emit(this.skillGroup);
                },
                () => {
                    this.errorMessage =
                    'Une erreur est survenue durant l\'ajout de la nouvelle compétence.';
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
                }
            );
    }

    /**
     * Helper that replace the existing version of
     * a skill by it's modified version in the lists of 'skills'.
     *
     * @param modifiedSkill a modified version of an existing skill
     */
    updateSkill(modifiedSkill: Skill): void {
        this.skillGroup.skills.filter(skill => skill.id === modifiedSkill.id).map(s => s = modifiedSkill);
    }

    /**
     * Call a service to persist the modifications done to an existing skill group.
     */
    updateSkillGroup(): void {
        this.privService.updateSkillGroup(this.skillGroup)
            .pipe(this._scavenger.collect())
            .subscribe(
                skillGroup => {
                    this.sucessMessage = 'Le groupe de compétence a bien été mis à jour.';
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
                    this.updateGroup.emit(this.skillGroup);
                },
                () => {
                    this.errorMessage =
                    'Une erreur est survenue durant la modification du groupe de compétences.';
                    setInterval(() => {
                        this.errorMessage = undefined;
                    }, 7000);
                }
            );
    }

    /**
     * Call a service to remove a skill from a skill group.
     * It will be deleted from the database.
     *
     * @param skill the skill to remove
     */
    deleteSkill(skill: Skill): void {
        this.privService.deleteSkill(skill.id)
            .pipe(this._scavenger.collect())
            .subscribe(
                () => {
                    this.sucessMessage = 'La compétence a été retirée avec succès.';
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
                    const group = new SkillGroup(this.skillGroup.title, this.skillGroup.skills.filter(s => s.id !== skill.id));
                    group.id = this.skillGroup.id;
                    this.deleteASkill.emit(group);
                    this.skillGroup = group;
                },
                () => {
                    this.errorMessage =
                    'Une erreur est survenue durant la suppression de la compétence.';
                    setInterval(() => {
                        this.errorMessage = undefined;
                    }, 7000);
                }
            );
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
