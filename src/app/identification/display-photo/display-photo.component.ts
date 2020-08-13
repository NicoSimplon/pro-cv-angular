import { Component, OnInit, Input } from '@angular/core';

/**
 * Component for displaying the photography of the profile.
 */
@Component({
  selector: 'app-display-photo',
  templateUrl: './display-photo.component.html',
  styleUrls: ['./display-photo.component.css']
})
export class DisplayPhotoComponent implements OnInit {

    @Input()
    photoUrl: string;

    constructor() { }

    ngOnInit(): void {}

}
