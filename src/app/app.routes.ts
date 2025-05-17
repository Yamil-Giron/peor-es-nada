import { Routes } from '@angular/router';
import { ListNoticesComponent } from './components/list-notices/list-notices.component';
import { CreateNoticeComponent } from './components/create-notice/create-notice.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-notices',
    pathMatch: 'full'
  },
  {
    path: 'list-notices',
    component: ListNoticesComponent
  },
  {
    path: 'create-notice',
    component: CreateNoticeComponent
  }
];
