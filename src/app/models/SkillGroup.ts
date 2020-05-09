import { Skill } from './Skill';

export class SkillGroup {

    public id: number;

    constructor(public title: string, public skills: Skill[]) {}

}
