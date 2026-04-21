import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Profile } from './components/profile/profile';
import { EditTransaction } from './components/transactions/edit-transaction/edit-transaction';
import { AddTransaction } from './components/transactions/add-transaction/add-transaction';
import { AddGoal } from './components/add-goal/add-goal';

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
    path: 'transaction/edit/:id',
    component: EditTransaction,
    title: 'Edit Transaction',
  },
  {
    path: 'transaction/add',
    component: AddTransaction,
    title: 'Add Transaction',
  },
  {
    path: 'goal/add',
    component: AddGoal,
    title: 'Add Budget Goal',
  },
];
