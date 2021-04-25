import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutModule } from '../../shared/modules/layout/layout.module';

//components
import { DashboardComponent } from "./dashboard.component";
import { ProfileComponent } from './pages/profile/profile.component';
import { CategoryComponent } from './pages/category/category.component';
import { ContentComponent } from './pages/content/content.component';
import { AddContentComponent } from './pages/content/add-content/add-content.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
    LayoutModule,
  ],
  declarations: [DashboardComponent, ProfileComponent, CategoryComponent, ContentComponent, AddContentComponent]
})
export class DashboardModule { }
