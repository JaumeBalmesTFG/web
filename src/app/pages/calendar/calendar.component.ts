import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { getCalendar } from 'src/app/services/calendar.service';
import { ModalTaskEditComponent } from '../../modals/modal-task-edit/modal-task-edit.component';
import { ModalTaskTruancyComponent } from '../../modals/modal-task-truancy/modal-task-truancy.component';
import { ModalTruancyEditComponent } from '../../modals/modal-truancy-edit/modal-truancy-edit.component';
import { isLocalStorageToken } from '../../services/auth.service';
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
        events:[],
        eventClick: this.clickEvent.bind(this)
    }

    ngOnInit() {
        if(!isLocalStorageToken()){
            this.router.navigate([`/login`]);
        }

        this.refetchEvents();
    }

    selectTab(tabSelected: any){
        console.log(tabSelected)
        this.router.navigate([`/${tabSelected}`]);
    }

    handleDateClick(date:any){
        const dialogRef = this.dialog.open(ModalTaskTruancyComponent,{
            data: date.dateStr,
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if(!result){ return; }
            this.refetchEvents();
        });
    }
    clickEvent(arg:any){
        if(arg.event._def.extendedProps.elementType == 'task'){
            const dialogRef = this.dialog.open(ModalTaskEditComponent,{
                data: {...arg.event._def.extendedProps, date: arg.event.start},
                autoFocus: false
            });

            dialogRef.afterClosed().subscribe(result => {
                if(!result){ return; }
                this.refetchEvents();
            });
        }
        else if(arg.event._def.extendedProps.elementType == 'truancy'){
            const dialogRef = this.dialog.open(ModalTruancyEditComponent,{
                data: arg.event._def.extendedProps,
                autoFocus: false
            });

            dialogRef.afterClosed().subscribe(result => {
                if(!result){ return; }
                this.refetchEvents();
            });
        }
    }

    async refetchEvents(){
        let res: any = await getCalendar();
        this.calendarOptions.events = res.body;
    }
}
