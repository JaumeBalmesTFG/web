import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getAllRules } from 'src/app/services/rule.service';
import { getAll, getAllSubjects, getUfsFromOneModule } from 'src/app/services/subject.service';
import { createTask } from 'src/app/services/task.service';

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
    rules:any = []
    task_data:any = {
        moduleId: '',
        ufId: '',
        ruleId: '',
        name: '',
        description: '',
        dueDate: ''
    }
    subjectSelected: any
    UFSelected: any
    subjectSelectedTruancy: any

    ngOnInit() {
        this.formTask = this.formBuilder.group({
            subject: ['', Validators.required],
            UF: ['', Validators.required],
            title: ['', Validators.required],
            type: ['', Validators.required],
            description: ['', Validators.required],
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

    async callUfs(): Promise<void> {
        let res: any = await getUfsFromOneModule(this.task_data.moduleId);
        this.ufs = res.body;
    }

    async callRules(): Promise<void> {
        let res: any = await getAllRules(this.task_data.ufId);
        this.rules = res.body;
    }

    selectSubject(subject: any) {
        this.task_data.moduleId = subject;
        this.callUfs();
    }

    selectSubjectTruancy(subject: any) {
        this.subjects.forEach((subjectData: { name: any; }) => {
            if (subject === subjectData.name) {
                this.subjectSelectedTruancy = subjectData
            }
        })
    }

    async createNewTask() {
        this.task_data.dueDate = this.data;
        if (this.formTask.valid) {
            console.log(await createTask(JSON.stringify(this.task_data)));
            this.dialogRef.close();
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
        this.task_data.ufId = UFSelected;
        this.callRules();
    }

    selectRule(ruleSelected: any) {
        this.task_data.ruleId = ruleSelected;
    }

    getTitle(){
        this.task_data.name = this.formTask.get('title')!.value;
    }

    getDescription(){
        this.task_data.description = this.formTask.get('description')!.value;
    }
}
