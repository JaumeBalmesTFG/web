import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ShowGradesComponent } from './pages/show-grades/show-grades.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login.component';
import { SubjectsAndUfsComponent } from './pages/subjects-and-ufs/subjects-and-ufs.component';
import { SubjectWithUfComponent } from './child-components/subject-with-uf/subject-with-uf.component';
import { ModalUfComponent } from './modals/modal-uf/modal-uf.component';
import { ModalSubjectComponent } from './modals/modal-subject/modal-subject.component';
import { WebRoutingModule } from './web-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { ModalTaskTruancyComponent } from './modals/modal-task-truancy/modal-task-truancy.component';
import { ModalTaskEditComponent } from './modals/modal-task-edit/modal-task-edit.component';
import { ModalTruancyEditComponent } from './modals/modal-truancy-edit/modal-truancy-edit.component';
import {SubjectWithUfAndTaskComponent} from './child-components/subject-with-uf-and-task/subject-with-uf-and-task.component'
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { ModalDeleteComponent } from './modals/modal-delete/modal-delete.component';
import { ArchiveSubjectsComponent } from './pages/archive-subjects/archive-subjects.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
    dayGridPlugin,
    interactionPlugin
]);

@NgModule({
    declarations: [
        AppComponent,
        CalendarComponent,
        ShowGradesComponent,
        HeaderComponent,
        LoginComponent,
        SubjectsAndUfsComponent,
        SubjectWithUfComponent,
        ModalUfComponent,
        ModalSubjectComponent,
        ModalTaskTruancyComponent,
        ModalTaskEditComponent,
        ModalTruancyEditComponent,
        SubjectWithUfAndTaskComponent,
        ModalDeleteComponent,
        ArchiveSubjectsComponent
    ],
    imports: [
        BrowserModule,
        WebRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatRadioModule,
        FormsModule,
        MatTabsModule,
        ReactiveFormsModule,
        MatIconModule,
        FullCalendarModule,
        MatSelectModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatDividerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
