import {Component, Input, OnInit} from '@angular/core';
import {Actions} from 'ngrx-entity-crud';
import {Store} from '@ngrx/store';
import {parseQueryString} from '@core/utils/j-utils';
import {RootStoreState} from '@root-store/index';

@Component({
    selector: 'app-search',
    template: `
        <ion-item>
            <ion-label position="floating">Search</ion-label>
            <ion-input #search type="text" (keyup.enter)="onSearch(search.value)"></ion-input>
        </ion-item>
    `,
    styles: []
})
export class SearchComponent implements OnInit {

    @Input()
    actions: Actions<any>;

    constructor(protected store$: Store<RootStoreState.State>) {
    }

    ngOnInit() {
        this.store$.dispatch(
            this.actions.SearchRequest({queryParams: {}})
        );
    }

    onSearch(value: string) {
        console.log('SearchComponent.onSearch()');
        this.store$.dispatch(this.actions.SearchRequest({queryParams: parseQueryString(value)}));
    }
}


