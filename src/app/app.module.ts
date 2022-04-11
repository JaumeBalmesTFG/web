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
    
  ],
  imports: [
    BrowserModule,
    WebRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
