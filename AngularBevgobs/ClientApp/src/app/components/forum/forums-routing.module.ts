import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumDetailComponent } from './forum-detail/forum-detail.component';

const routes: Routes = [
  { path: 'list', component: ForumListComponent },
  { path: 'detail/:id', component: ForumDetailComponent },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumsRoutingModule {}
