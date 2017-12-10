import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JsmartbotSharedModule } from '../../shared';
import {
    ItemMySuffixService,
    ItemMySuffixPopupService,
    ItemMySuffixComponent,
    ItemMySuffixDetailComponent,
    ItemMySuffixDialogComponent,
    ItemMySuffixPopupComponent,
    ItemMySuffixDeletePopupComponent,
    ItemMySuffixDeleteDialogComponent,
    itemRoute,
    itemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...itemRoute,
    ...itemPopupRoute,
];

@NgModule({
    imports: [
        JsmartbotSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ItemMySuffixComponent,
        ItemMySuffixDetailComponent,
        ItemMySuffixDialogComponent,
        ItemMySuffixDeleteDialogComponent,
        ItemMySuffixPopupComponent,
        ItemMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ItemMySuffixComponent,
        ItemMySuffixDialogComponent,
        ItemMySuffixPopupComponent,
        ItemMySuffixDeleteDialogComponent,
        ItemMySuffixDeletePopupComponent,
    ],
    providers: [
        ItemMySuffixService,
        ItemMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JsmartbotItemMySuffixModule {}
