import { Routes } from '@angular/router';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemIndexComponent } from './item-index/item-index.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemUpdateComponent } from './item-update/item-update.component';
import { LoginComponent } from './login/login.component';
import { authenticationGuard } from './guards/authentication.guard';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/items',
    pathMatch: 'full',
  },
  {
    path: 'connection',
    component: LoginComponent,
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivateChild: [authenticationGuard],
    children: [
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
    ],
  },
];
