import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumsRoutingModule } from './forums-routing.module';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumDetailComponent } from './forum-detail/forum-detail.component';

@NgModule({
  declarations: [
    ForumListComponent,
    ForumDetailComponent,
    // Add other components related to the forums feature
  ],
  imports: [
    CommonModule,
    ForumsRoutingModule,
  ],
})
export class ForumsModule {}
