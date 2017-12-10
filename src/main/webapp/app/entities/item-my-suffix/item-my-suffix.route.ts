import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ItemMySuffixComponent } from './item-my-suffix.component';
import { ItemMySuffixDetailComponent } from './item-my-suffix-detail.component';
import { ItemMySuffixPopupComponent } from './item-my-suffix-dialog.component';
import { ItemMySuffixDeletePopupComponent } from './item-my-suffix-delete-dialog.component';

export const itemRoute: Routes = [
    {
        path: 'item-my-suffix',
        component: ItemMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jsmartbotApp.item.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'item-my-suffix/:id',
        component: ItemMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jsmartbotApp.item.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const itemPopupRoute: Routes = [
    {
        path: 'item-my-suffix-new',
        component: ItemMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jsmartbotApp.item.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'item-my-suffix/:id/edit',
        component: ItemMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jsmartbotApp.item.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'item-my-suffix/:id/delete',
        component: ItemMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jsmartbotApp.item.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
