import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private feature: String = 'recipes';
    @Output() featureChanged = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {}

    onClick(feature: string) {
        this.feature = feature;
        this.featureChanged.emit(feature);
    }

}
