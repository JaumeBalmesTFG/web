import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { ModalTaskEditComponent } from '../../modals/modal-task-edit/modal-task-edit.component';
import { ModalTaskTruancyComponent } from '../../modals/modal-task-truancy/modal-task-truancy.component';
import { ModalTruancyEditComponent } from '../../modals/modal-truancy-edit/modal-truancy-edit.component';
@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    constructor(
        private dialog: MatDialog,
        private router: Router,
    ) { }


    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'next',
        },
        height: 630,
        dateClick: this.handleDateClick.bind(this),
        datesSet: this.handleDatesSet.bind(this),
        events:[],
        eventClick: this.clickEvent.bind(this)
    }

    ngOnInit(): void {
    }

    selectTab(tabSelected: any){
        console.log(tabSelected)
        this.router.navigate([`/${tabSelected}`]);
    }

    handleDateClick(date:any){
        console.log(date);

        const dialogRef = this.dialog.open(ModalTaskTruancyComponent,{
            data: date.dateStr,
            autoFocus: false
        });
    }
    clickEvent(arg:any){
        console.log('hola', arg.event._def.extendedProps);
        console.log(arg.event._def.extendedProps.info);
        if(arg.event._def.extendedProps.info == 'task'){
            const dialogRef = this.dialog.open(ModalTaskEditComponent,{
                data: arg.event._def.extendedProps.data,
                autoFocus: false
            });
        }
        else if(arg.event._def.extendedProps.info == 'truancy'){
            const dialogRef = this.dialog.open(ModalTruancyEditComponent,{
                data: arg.event._def.extendedProps.data,
                autoFocus: false
            });
        }
    }
    handleDatesSet(arg:any){
        this.calendarOptions.events = [
            { title: 'event 1', date: '2022-04-14', info: 'task', data: {subject: "Subject 1", UF: "uf 1", title: 'event 1', type: 'examen', date: '2022-04-14'} },
            { title: 'event 2', date: '2022-04-03', info: 'truancy', data: {subject: "Subject 1", UF: "uf 1", hours: 2, date: '2022-04-03'} }
        ]
    }
}
