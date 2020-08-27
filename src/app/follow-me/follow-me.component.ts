import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

/**
 * Component to display some links (gitHub, Linkedin)
 */
@Component({
    selector: 'app-follow-me',
    templateUrl: './follow-me.component.html',
    styleUrls: ['./follow-me.component.css'],
})
export class FollowMeComponent implements OnInit {

    startURIStaticResources = environment.startURIStaticResources;
    linkedinLink = 'https://www.linkedin.com/in/nicolas-marty-140216153';
    gitHubLink = 'https://github.com/NicoSimplon';

    constructor() {}

    ngOnInit(): void {}
}
