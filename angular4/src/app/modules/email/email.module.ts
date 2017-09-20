import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GuardarEmailComponent } from '../guardar-email/guardar-email.component';
import { MostrarEmailComponent } from '../mostrar-email/mostrar-email.component';
import { MainEmailComponent } from '../main-email/main-email.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    GuardarEmailComponent,
    MostrarEmailComponent,
    MainEmailComponent
  ],
  exports:[MainEmailComponent]
})
export class EmailModule { }
