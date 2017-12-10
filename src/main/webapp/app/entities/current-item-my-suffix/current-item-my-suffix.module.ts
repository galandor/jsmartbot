import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JsmartbotSharedModule } from '../../shared';
import {
    CurrentItemMySuffixService,
    CurrentItemMySuffixPopupService,
    CurrentItemMySuffixComponent,
    CurrentItemMySuffixDetailComponent,
    CurrentItemMySuffixDialogComponent,
    CurrentItemMySuffixPopupComponent,
    CurrentItemMySuffixDeletePopupComponent,
    CurrentItemMySuffixDeleteDialogComponent,
    currentItemRoute,
    currentItemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...currentItemRoute,
    ...currentItemPopupRoute,
];

@NgModule({
    imports: [
        JsmartbotSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CurrentItemMySuffixComponent,
        CurrentItemMySuffixDetailComponent,
        CurrentItemMySuffixDialogComponent,
        CurrentItemMySuffixDeleteDialogComponent,
        CurrentItemMySuffixPopupComponent,
        CurrentItemMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CurrentItemMySuffixComponent,
        CurrentItemMySuffixDialogComponent,
        CurrentItemMySuffixPopupComponent,
        CurrentItemMySuffixDeleteDialogComponent,
        CurrentItemMySuffixDeletePopupComponent,
    ],
    providers: [
        CurrentItemMySuffixService,
        CurrentItemMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JsmartbotCurrentItemMySuffixModule {}
