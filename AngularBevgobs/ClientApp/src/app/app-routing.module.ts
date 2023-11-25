import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import { SubforumContainerComponent } from './subforum/subforum-container.component';
import { ThreadContainerComponent } from './thread/thread-container.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'forums', component: ForumComponent },
  { path: 'subforum/:id', component: SubforumContainerComponent },
  { path: 'thread/:id', component: ThreadContainerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
