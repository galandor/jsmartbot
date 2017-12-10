import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CurrentItemMySuffixComponent } from './current-item-my-suffix.component';
import { CurrentItemMySuffixDetailComponent } from './current-item-my-suffix-detail.component';
import { CurrentItemMySuffixPopupComponent } from './current-item-my-suffix-dialog.component';
import { CurrentItemMySuffixDeletePopupComponent } from './current-item-my-suffix-delete-dialog.component';

export const currentItemRoute: Routes = [
    {
        path: 'current-item-my-suffix',
        component: CurrentItemMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jsmartbotApp.currentItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'current-item-my-suffix/:id',
        component: CurrentItemMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jsmartbotApp.currentItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const currentItemPopupRoute: Routes = [
    {
        path: 'current-item-my-suffix-new',
        component: CurrentItemMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jsmartbotApp.currentItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'current-item-my-suffix/:id/edit',
        component: CurrentItemMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jsmartbotApp.currentItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'current-item-my-suffix/:id/delete',
        component: CurrentItemMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jsmartbotApp.currentItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
