import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CurrentItemMySuffix } from './current-item-my-suffix.model';
import { CurrentItemMySuffixService } from './current-item-my-suffix.service';

@Component({
    selector: 'jhi-current-item-my-suffix-detail',
    templateUrl: './current-item-my-suffix-detail.component.html'
})
export class CurrentItemMySuffixDetailComponent implements OnInit, OnDestroy {

    currentItem: CurrentItemMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private currentItemService: CurrentItemMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCurrentItems();
    }

    load(id) {
        this.currentItemService.find(id).subscribe((currentItem) => {
            this.currentItem = currentItem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCurrentItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'currentItemListModification',
            (response) => this.load(this.currentItem.id)
        );
    }
}
