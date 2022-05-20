import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ModalTaskEditComponent} from 'src/app/modals/modal-task-edit/modal-task-edit.component';
import {isLocalStorageToken} from '../../services/auth.service';
import {getAll} from "../../services/subject.service";
import {getTask} from '../../services/task.service'

@Component({
    selector: 'app-show-grades',
    templateUrl: './show-grades.component.html',
    styleUrls: ['./show-grades.component.scss']
})
export class ShowGradesComponent implements OnInit {

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private toastr: ToastrService
    ) {
    }

    subjectsInfo: any[] = [];

    async ngOnInit() {
        if (!isLocalStorageToken()) {
            this.router.navigate([`/login`]);
        }
        await this.getData();
    }

    async getData() {
        this.subjectsInfo = [];
        const response: any = await getAll();
        response.forEach((data: any) => {
            this.subjectsInfo.push(data);
        });
    }

    selectTab(tabSelected: any) {
        this.router.navigate([`/${tabSelected}`]);
    }

    async openTask(task: any) {
        if (!task.grade) {
            let res: any = await getTask(task._id)
            let sendData = {
                elementId: res.body._id,
                moduleId: res.body.moduleId,
                ufId: res.body.ufId,
                ruleId: res.body.ruleId,
                date: res.body.dueDate,
            }
            const dialogRef = this.dialog.open(ModalTaskEditComponent, {
                data: sendData
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (!result) {
                    return
                }
                if (result === 'edited') {
                    this.toastr.success('Task successfully updated', 'Success', {
                        closeButton: true,
                        progressBar: true
                    });
                } else if (result === 'delete') {
                    this.toastr.success('Task successfully deleted', 'Success', {
                        closeButton: true,
                        progressBar: true
                    });
                }
                this.getData();
            })
        }
    }
}
