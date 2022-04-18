import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { AppComponent } from './app.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ShowGradesComponent } from './show-grades/show-grades.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SubjectsAndUfsComponent } from './subjects-and-ufs/subjects-and-ufs.component';
import { NgForUFsComponent } from './subjects-and-ufs/ng-for-ufs/ng-for-ufs.component';
import { ModalUfComponent } from './subjects-and-ufs/ng-for-ufs/modal-uf/modal-uf.component';
import { ModalSubjectComponent } from './subjects-and-ufs/modal-subject/modal-subject.component';
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
import { ModalTaskTruancyComponent } from './calendario/modal-task-truancy/modal-task-truancy.component';
import { ModalTaskEditComponent } from './calendario/modal-task-edit/modal-task-edit.component';
import { ModalTruancyEditComponent } from './calendario/modal-truancy-edit/modal-truancy-edit.component';
import {UfGradesComponent} from './show-grades/uf-grades/uf-grades.component'
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatExpansionModule} from '@angular/material/expansion'; 

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    CalendarioComponent,
    ShowGradesComponent,
    HeaderComponent,
    LoginComponent,
    SubjectsAndUfsComponent,
    NgForUFsComponent,
    ModalUfComponent,
    ModalSubjectComponent,
    ModalTaskTruancyComponent,
    ModalTaskEditComponent,
    ModalTruancyEditComponent,
    UfGradesComponent
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
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
