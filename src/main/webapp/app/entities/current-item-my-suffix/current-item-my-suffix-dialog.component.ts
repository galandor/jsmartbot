import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CurrentItemMySuffix } from './current-item-my-suffix.model';
import { CurrentItemMySuffixPopupService } from './current-item-my-suffix-popup.service';
import { CurrentItemMySuffixService } from './current-item-my-suffix.service';
import { ItemMySuffix, ItemMySuffixService } from '../item-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-current-item-my-suffix-dialog',
    templateUrl: './current-item-my-suffix-dialog.component.html'
})
export class CurrentItemMySuffixDialogComponent implements OnInit {

    currentItem: CurrentItemMySuffix;
    isSaving: boolean;

    itemids: ItemMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private currentItemService: CurrentItemMySuffixService,
        private itemService: ItemMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.itemService
            .query({filter: 'currentitem-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.currentItem.itemIdId) {
                    this.itemids = res.json;
                } else {
                    this.itemService
                        .find(this.currentItem.itemIdId)
                        .subscribe((subRes: ItemMySuffix) => {
                            this.itemids = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.currentItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.currentItemService.update(this.currentItem));
        } else {
            this.subscribeToSaveResponse(
                this.currentItemService.create(this.currentItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<CurrentItemMySuffix>) {
        result.subscribe((res: CurrentItemMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CurrentItemMySuffix) {
        this.eventManager.broadcast({ name: 'currentItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackItemById(index: number, item: ItemMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-current-item-my-suffix-popup',
    template: ''
})
export class CurrentItemMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private currentItemPopupService: CurrentItemMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.currentItemPopupService
                    .open(CurrentItemMySuffixDialogComponent as Component, params['id']);
            } else {
                this.currentItemPopupService
                    .open(CurrentItemMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
