import { Component, OnInit } from '@angular/core';
import { PublicServicesService } from '../services/public-services.service';
import { SkillGroup } from '../models/SkillGroup';
import { EditMode } from '../models/EditMode';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent extends EditMode implements OnInit {

    skills: SkillGroup[];

    constructor(private service: PublicServicesService) {
        super();
    }

    ngOnInit(): void {
        this.service.getSkills().subscribe(
            skillGroupList => {
                this.skills = skillGroupList;
            },
            messageKo => {
                console.log(messageKo);
            }
        );
    }

}
