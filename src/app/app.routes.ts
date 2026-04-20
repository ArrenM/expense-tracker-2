import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Profile } from './components/profile/profile';
import { EditTransaction } from './components/transactions/edit-transaction/edit-transaction';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: 'profile',
    component: Profile,
    title: 'Profile',
  },
  {
    path: 'edit/transaction/:id',
    component: EditTransaction,
    title: 'Edit Transaction',
  },
];
