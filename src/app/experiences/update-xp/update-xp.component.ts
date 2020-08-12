import { XpPro } from './../../models/XpPro';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Scavenger } from '@wishtack/rx-scavenger';
import { PrivateServicesService } from 'src/app/services/private-services.service';

/**
 * Component for updating an existing professional experience.
 */
@Component({
    selector: 'app-update-xp',
    templateUrl: './update-xp.component.html',
    styleUrls: ['./update-xp.component.css'],
})
export class UpdateXpComponent implements OnInit, OnDestroy {

    private _scavenger = new Scavenger(this);

    // Notifications
    errorMessage: string;
    sucessMessage: string;

    @Input()
    experience: XpPro;

    @Output()
    update = new EventEmitter<XpPro>(true);

    constructor(private privService: PrivateServicesService) {}

    /**
     * Call a service to persist the modified values of an existing professional experience.
     */
    updateXp(): void {
        this.privService.updateXp(this.experience).pipe(this._scavenger.collect()).subscribe(
            (xp) => {
                this.sucessMessage =
                    `L'expérience ${xp.title} a été modifiée avec succès.`;
                setInterval(() => {
                    this.sucessMessage = undefined;
                }, 7000);
                this.update.emit(xp);
            },
            () => {
                this.errorMessage = 'Une erreur est survenue lors de la modification de l\'expérience professionnelle.';
                setInterval(() => {
                    this.errorMessage = undefined;
                }, 7000);
            }
        );
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {}

}
