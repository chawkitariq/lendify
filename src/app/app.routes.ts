import { Routes } from '@angular/router';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemIndexComponent } from './item-index/item-index.component';
import { ItemCreateComponent } from './item-create/item-create.component';

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
    path: '',
    redirectTo: '/items',
    pathMatch: 'full',
  },
];
