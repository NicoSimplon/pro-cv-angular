import { Input } from '@angular/core';

/**
 * This class is meant to identify if th edittion mode has to be displayed or not
 */
export class EditMode {

    @Input()
    public editMode: boolean;

    constructor() {}

}
