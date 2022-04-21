import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalTaskTruancyComponent } from '../../modals/modal-task-truancy/modal-task-truancy.component';
import { ModalTaskEditComponent } from '../../modals/modal-task-edit/modal-task-edit.component';
import { ModalTruancyEditComponent } from '../../modals/modal-truancy-edit/modal-truancy-edit.component';



@NgModule({
  declarations: [
    ModalTaskTruancyComponent,
    ModalTaskEditComponent,
    ModalTruancyEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CalendarioModule { }
