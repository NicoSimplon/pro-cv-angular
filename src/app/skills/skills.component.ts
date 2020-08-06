import { PrivateServicesService } from './../services/private-services.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { SkillGroup } from '../models/SkillGroup';
import { EditMode } from '../models/EditMode';
import { Scavenger } from '@wishtack/rx-scavenger';
import { Skill } from '../models/Skill';

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
    newSkillGroup: SkillGroup;
    newSkill = new Skill('');
    newAloneSkill = new Skill('');

    constructor(private service: PublicServicesService, private privService: PrivateServicesService) {
        super();
    }

    /**
     * Create a new skill in an existing skill group.
     *
     * @param newSkill the new skill object that ha to persisted
     * @param groupId the Id of the skill group in which it will be added
     */
    createSkillAlone(groupId: number) {
        const skill = new Skill(this.newAloneSkill.title);
        this.privService.createSkill(skill, groupId)
            .pipe(this._scavenger.collect())
            .subscribe(
                s => {
                    this.skills.filter(group => group.id === groupId).map(
                        group => group.skills.push(s)
                    );
                    this.sucessMessage = `La compétence << ${s.title} >> a été ajoutée au groupe.`;
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
                    this.skills.push(skillGroup);
                    this.newSkillGroup = new SkillGroup('', []);
                    this.sucessMessage = `Le nouveau groupe de compétences ${skillGroup.title} a été créé avec succès.`;
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
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

    /**
     * Helper that replace the existing version of
     * a skill by it's modified version in the lists of 'skills'.
     *
     * @param modifiedSkill a modified version of an existing skill
     */
    updateSkill(modifiedSkill: Skill, groupId: number): void {
        this.skills.filter(group => group.id === groupId).map(
            group => group.skills.filter(skill => skill.id === modifiedSkill.id).map(s => s = modifiedSkill)
        );
    }

    /**
     * Call a service to persist the modifications done to an existing skill group.
     *
     * @param modifiedSkillGroup an existing skill group that has been modified
     */
    updateSkillGroup(modifiedSkillGroup: SkillGroup): void {
        this.privService.updateSkillGroup(modifiedSkillGroup)
            .pipe(this._scavenger.collect())
            .subscribe(
                skillGroup => {
                    this.skills.filter(group => group.id === skillGroup.id).map(group => group = skillGroup);
                    this.sucessMessage = 'Le groupe de compétence a bien été mis à jour.';
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
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
     * Call a service to remove the selected skill group from the database.
     * All the skills in this group will be removed by the operation.
     *
     * @param skillGroup the skill group that has to be removed
     */
    deleteGroup(skillGroup: SkillGroup): void {
        this.privService.deleteSkillGroup(skillGroup.id)
            .pipe(this._scavenger.collect())
            .subscribe(
                () => {
                    this.getSkills();
                    this.sucessMessage = 'Le groupe de compétence a été supprimé avec succès.';
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
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
                    this.getSkills();
                    this.sucessMessage = 'La compétence a été retirée avec succès.';
                    setInterval(() => {
                        this.sucessMessage = undefined;
                    }, 7000);
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

    /**
     * Get the list of the skill groups and their skills.
     */
    getSkills(): void {
        this.service.getSkills().pipe(this._scavenger.collect()).subscribe(
            skillGroupList => {
                this.skills = skillGroupList;
                this.newSkillGroup = new SkillGroup('', []);
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

    ngOnDestroy(): void {
    }

}
