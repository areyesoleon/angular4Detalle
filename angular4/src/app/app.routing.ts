import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { TiendaComponent } from './components/tienda/tienda.component';
import { HomeComponent } from './components/home/home.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { ContactComponent } from './components/contact/contact.component';
import { KeeperComponent } from './components/keeper/keeper.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';

const appRoutes: Routes = [
   { path: '', component: HomeComponent },
   { path: '', redirectTo: 'inicio', pathMatch: 'full' },
   { path: 'inicio', component: HomeComponent },
   { path: 'tienda', component: TiendaComponent },
   { path: 'animales', component: AnimalsComponent },
   { path: 'contacto', component: ContactComponent },
   { path: 'cuidadores', component: KeeperComponent },
   { path: 'registro', component: RegisterComponent },
   { path: 'login', component: LoginComponent },
   { path: 'mis-datos', component: UserEditComponent },
   { path: 'animal/:id', component: AnimalDetailsComponent },
   { path: '**', component: HomeComponent },
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);