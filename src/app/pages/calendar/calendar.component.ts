import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {CalendarOptions, EventDropArg} from '@fullcalendar/angular';
import { getCalendar } from 'src/app/services/calendar.service';
import { ModalTaskEditComponent } from '../../modals/modal-task-edit/modal-task-edit.component';
import { ModalTaskTruancyComponent } from '../../modals/modal-task-truancy/modal-task-truancy.component';
import { ModalTruancyEditComponent } from '../../modals/modal-truancy-edit/modal-truancy-edit.component';
import { isLocalStorageToken } from '../../services/auth.service';
import {ToastrService} from "ngx-toastr";
@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private toastr: ToastrService
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
        eventClick: this.clickEvent.bind(this),
        editable: true,
        eventDrop: this.dropEvent.bind(this)
    }

    ngOnInit() {
        if(!isLocalStorageToken()){
            this.router.navigate([`/login`]);
        }

        this.refetchEvents();
    }

    selectTab(tabSelected: any){
        this.router.navigate([`/${tabSelected}`]);
    }

    handleDateClick(date:any){
        const dialogRef = this.dialog.open(ModalTaskTruancyComponent,{
            data: date.dateStr,
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if(!result){ return; }

            // Function options .success/error/warning/info/show
            this.toastr.success('Whatever successfully created!', 'Success', {
                closeButton: true,
                progressBar: true
            });

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
                data: {...arg.event._def.extendedProps, date: arg.event.start},
                autoFocus: false
            });

            dialogRef.afterClosed().subscribe(result => {
                if(!result){ return; }
                this.refetchEvents();
            });
        }
    }

    dropEvent(data: EventDropArg) {

        // Here only you have to update the event executing the service

        const elementType = data.event._def.extendedProps['elementType'];

        if (elementType == "task") {

            // Get the new task event
            const event = data.event._def;
            console.log(event);

            // Update the task

        } else if (elementType == "truancy") {

            // Get the new truancy event
            const event = data.event._def;
            console.log(event);

            // Update the truancy

        }

    }

    async refetchEvents(){
        let res: any = await getCalendar();
        this.calendarOptions.events = res.body;
    }
}
