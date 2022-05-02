import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { LoginComponent } from './login/login.component';
import { ShowGradesComponent } from './show-grades/show-grades.component';
import { SubjectsAndUfsComponent } from './subjects-and-ufs/subjects-and-ufs.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'calendar', component: CalendarioComponent},
  {path:'subjects', component: SubjectsAndUfsComponent},
  {path:'grades', component: ShowGradesComponent},
  {path:'',redirectTo: '/calendar', pathMatch: 'full'}
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
