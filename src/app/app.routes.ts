import { Routes } from '@angular/router';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemIndexComponent } from './item-index/item-index.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemUpdateComponent } from './item-update/item-update.component';

export const routes: Routes = [
  {
    path: 'items',
    component: ItemIndexComponent,
  },
  {
    path: 'items/create',
    component: ItemCreateComponent,
  },
  {
    path: 'items/:id',
    component: ItemDetailComponent,
  },
  {
    path: 'items/:id/update',
    component: ItemUpdateComponent,
  },
  {
    path: '',
    redirectTo: '/items',
    pathMatch: 'full',
  },
];
