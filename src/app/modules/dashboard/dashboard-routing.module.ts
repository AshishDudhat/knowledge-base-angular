import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CategoryComponent } from './pages/category/category.component';
import { ContentComponent } from './pages/content/content.component';
import { AddContentComponent } from './pages/content/add-content/add-content.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{ path: '', redirectTo: 'profile', pathMatch: 'full'},
			{ path: 'profile', component: ProfileComponent },
			{ path: 'category', component: CategoryComponent },
			{ path: 'content', component: ContentComponent },
			{ path: 'add/content', component: AddContentComponent },
		]
	}
];

@NgModule({
  	imports: [RouterModule.forChild(routes)],
  	exports: [RouterModule]
})
export class DashboardRoutingModule { }
