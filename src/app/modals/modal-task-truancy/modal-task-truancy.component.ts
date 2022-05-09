import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getAll, getAllSubjects } from 'src/app/services/subject.service';

@Component({
    selector: 'app-modal-task-truancy',
    templateUrl: './modal-task-truancy.component.html',
    styleUrls: ['./modal-task-truancy.component.scss']
})
export class ModalTaskTruancyComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: string,
        public dialogRef: MatDialogRef<ModalTaskTruancyComponent>
    ) { }

    close = false;
    formTask!: FormGroup;
    formTruancy!: FormGroup;

    subjects: any = []
    ufs:any = []
    subjectSelected: any
    UFSelected: any
    subjectSelectedTruancy: any

    ngOnInit() {
        this.formTask = this.formBuilder.group({
            subject: ['', Validators.required],
            UF: ['', Validators.required],
            title: ['', Validators.required],
            type: ['', Validators.required]
        });

        this.formTruancy = this.formBuilder.group({
            subject: ['', Validators.required],
            UF: ['', Validators.required],
            hours: ['', Validators.required],
            reason: ['']
        });

        this.callSubjects();
    }

    async callSubjects(): Promise<void> {
        let res: any = await getAllSubjects();
        this.subjects = res.body;
    }

    selectSubject(subject: any) {
        this.subjectSelected = subject;
    }

    selectSubjectTruancy(subject: any) {
        this.subjects.forEach((subjectData: { name: any; }) => {
            if (subject === subjectData.name) {
                this.subjectSelectedTruancy = subjectData
            }
        })
    }

    createNewTask() {
        if (this.formTask.valid) {
            this.dialogRef.close()
            console.log(this.formTask.value, this.data);
        }
        else {
            console.log("incorrect form");

        }
    }
    createNewTruancy() {
        if (this.formTruancy.valid) {
            this.dialogRef.close()
            console.log(this.formTruancy.value, this.data);
        }
        else {
            console.log("incorrect form");
        }
    }
    selectUF(UFSelected: any) {
        console.log(UFSelected);

        this.subjectSelected.UFs.forEach((UF: any) => {
            if (UFSelected === UF.value) {
                this.UFSelected = UF
            }
        })
    }
}
