import { PrivateServicesService } from './../services/private-services.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { SkillGroup } from '../models/SkillGroup';
import { EditMode } from '../models/EditMode';
import { Scavenger } from '@wishtack/rx-scavenger';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent extends EditMode implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    skills: SkillGroup[];

    constructor(private service: PublicServicesService) {
        super();
    }

    /**
     * Update the list of skill groups with the new skill.
     */
    createSkillAlone(skillGroup: SkillGroup) {
        this.skills.filter(group => group.id === skillGroup.id).map(group => group = skillGroup);
    }

    /**
     * Update the list of skill groups when a new one has been created.
     */
    createSkillGroup(skillGroup: SkillGroup): void {
        this.skills.push(skillGroup);
    }

    /**
     * Update the skill groups list when a group or it's skills are modified.
     */
    updateSkillGroup(modifiedSkillGroup: SkillGroup): void {
        this.skills.filter(group => group.id === modifiedSkillGroup.id).map(group => group = modifiedSkillGroup);
    }

    /**
     * Update the list of skill groups after one of them has been deleted.
     */
    deleteGroup(message: string): void {
        this.getSkills();
        this.sucessMessage = message;
        setInterval(() => {
            this.sucessMessage = undefined;
        }, 7000);
    }

    /**
     * Refresh the list of skill group when a skill has been deleted.
     */
    deleteSkill(skillGroup: SkillGroup): void {
        this.skills.filter(group => group.id === skillGroup.id)
            .map(group => group = skillGroup);
    }

    /**
     * Get the list of the skill groups and their skills.
     */
    getSkills(): void {
        this.service.getSkills().pipe(this._scavenger.collect()).subscribe(
            skillGroupList => {
                this.skills = skillGroupList;
            },
            () => {
                this.errorMessage =
                    'Une erreur est survenue durant la récupération des compétences.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {
        this.getSkills();
    }

    ngOnDestroy(): void {}

}
