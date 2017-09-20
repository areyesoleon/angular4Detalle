import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdminRoutinModule } from '../admin-routin/admin-routin.module';

import { MainComponent } from '../main/main.component';
import { ListComponent } from '../list/list.component';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { AdminGuard } from "../../services/admin.guard";
import { UserService } from "../../services/user.service";
import { SearchPipe } from '../pipes/search.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AdminRoutinModule
  ],
  declarations: [
    MainComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    SearchPipe
  ],
  exports: [
  ],
  providers: [
    UserService,
    AdminGuard
  ]
})
export class AdminModule { }
