import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getAllRules } from 'src/app/services/rule.service';
import { getAllSubjects, getUfsFromOneModule } from 'src/app/services/subject.service';
import { createTask } from 'src/app/services/task.service';
import { createTruancy } from 'src/app/services/truancy.service';

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

    truancy_data:any = {
        moduleId: '',
        ufId: '',
        hours: '',
        reason: '',
        date: ''
    }

    subjectSelected: any
    UFSelected: any
    subjectSelectedTruancy: any

    ngOnInit() {
        this.formTask = this.formBuilder.group({
            subject: ['', Validators.required],
            UF: ['', Validators.required],
            title: ['', Validators.required],
            rule: ['', Validators.required],
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

    async callUfs(data: string): Promise<void> {
        let res: any = await getUfsFromOneModule(data);
        this.ufs = res.body;
    }

    async callRules(): Promise<void> {
        let res: any = await getAllRules(this.task_data.ufId);
        this.rules = res.body;
    }

    selectSubject(subject: any) {
        this.task_data.moduleId = subject;
        this.callUfs(this.task_data.moduleId);
    }

    selectSubjectTruancy(subject: any) {
        this.truancy_data.moduleId = subject;
        this.callUfs(this.truancy_data.moduleId);
    }

    async createNewTask() {
        this.task_data.dueDate = this.data;
        if (this.formTask.valid) {
            await createTask(JSON.stringify(this.task_data));
            this.dialogRef.close(true);
        }
        else {
            this.formTask.markAllAsTouched();
            console.log("incorrect form");
        }
    }

    async createNewTruancy() {

        this.truancy_data.date = this.data;

        if (this.formTruancy.valid) {
            await createTruancy(JSON.stringify(this.truancy_data));
            this.dialogRef.close(true);
        }
        else {
            this.formTruancy.markAllAsTouched();
            console.log("incorrect form");
        }
    }
    
    selectUF(UFSelected: any) {
        this.task_data.ufId = UFSelected;
        this.callRules();
    }

    selectUFTruancy(UFSelected: any) {
        this.truancy_data.ufId = UFSelected;
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

    getHours(){
        this.truancy_data.hours = this.formTruancy.get('hours')!.value;
    }

    getReason(){
        this.truancy_data.reason = this.formTruancy.get('reason')!.value;
    }
}
