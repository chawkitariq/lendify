import { Routes } from '@angular/router';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemIndexComponent } from './item-index/item-index.component';

export const routes: Routes = [
    {
        path: 'items',
        component: ItemIndexComponent,
    },
    {
        path: "items/:id",
        component: ItemDetailComponent
    },
    {
        path: '',
        redirectTo: '/items',
        pathMatch: 'full'
    },
];
