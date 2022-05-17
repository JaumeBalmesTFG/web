import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { LoginComponent } from './auth/login.component';
import { ShowGradesComponent } from './pages/show-grades/show-grades.component';
import { SubjectsAndUfsComponent } from './pages/subjects-and-ufs/subjects-and-ufs.component';
import {ArchiveSubjectsComponent} from "./pages/archive-subjects/archive-subjects.component";

const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'calendar', component: CalendarComponent},
    {path:'subjectsAndUfs', component: SubjectsAndUfsComponent},
    {path:'showGrades', component: ShowGradesComponent},
    {path:'archived', component: ArchiveSubjectsComponent},
    {path:'',redirectTo: '/calendar', pathMatch: 'full'}
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule]
})
export class WebRoutingModule { }
