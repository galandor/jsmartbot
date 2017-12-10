import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CurrentItemMySuffix } from './current-item-my-suffix.model';
import { CurrentItemMySuffixPopupService } from './current-item-my-suffix-popup.service';
import { CurrentItemMySuffixService } from './current-item-my-suffix.service';

@Component({
    selector: 'jhi-current-item-my-suffix-delete-dialog',
    templateUrl: './current-item-my-suffix-delete-dialog.component.html'
})
export class CurrentItemMySuffixDeleteDialogComponent {

    currentItem: CurrentItemMySuffix;

    constructor(
        private currentItemService: CurrentItemMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.currentItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'currentItemListModification',
                content: 'Deleted an currentItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-current-item-my-suffix-delete-popup',
    template: ''
})
export class CurrentItemMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private currentItemPopupService: CurrentItemMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.currentItemPopupService
                .open(CurrentItemMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
