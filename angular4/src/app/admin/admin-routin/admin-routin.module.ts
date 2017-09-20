import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from '../main/main.component';
import { ListComponent } from '../list/list.component';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { AdminGuard } from "../../services/admin.guard";

const adminRoutes = [
  {
    path: 'admin-panel',
    component: MainComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'listado', pathMatch: 'full' },
      { path: 'listado', component: ListComponent },
      { path: 'crear', component: AddComponent },
      { path: 'editar/:id', component: EditComponent },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule,
  ]
})
export class AdminRoutinModule { }
