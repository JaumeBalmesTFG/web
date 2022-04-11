import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { LoginComponent } from './login/login.component';
import { ShowGradesComponent } from './show-grades/show-grades.component';
import { SubjectsAndUfsComponent } from './subjects-and-ufs/subjects-and-ufs.component';

const routes: Routes = [
  {path:'Login', component: LoginComponent},
  {path:'Calendari', component: CalendarioComponent},
  {path:'SubjectsAndUfs', component: SubjectsAndUfsComponent},
  {path:'ShowGrades', component: ShowGradesComponent},
  {path:'',redirectTo: '/Calendari', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    RouterModule
  ],
  exports: [RouterModule]
})
export class WebRoutingModule { }
