import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getAllRules, getRule } from 'src/app/services/rule.service';
import { getAll, getAllSubjects, getUfsFromOneModule } from 'src/app/services/subject.service';
import { deleteTask, getTask, updateTask } from 'src/app/services/task.service';

@Component({
    selector: 'app-modal-task-edit',
    templateUrl: './modal-task-edit.component.html',
    styleUrls: ['./modal-task-edit.component.scss']
})
export class ModalTaskEditComponent implements OnInit {
    selectOptionSubject: null | string = '';
    selectOptionUf: null | string = '';
    selectOptionRule: null | string = '';

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: { elementId: string, moduleId: string, ufId: string, ruleId: string, date: string },
        public dialogRef: MatDialogRef<ModalTaskEditComponent>
    ) { }

    emptyUfs = false;

    disabled = true;
    formTask!: FormGroup;
    subjects: any = []
    ufs: any = []
    rules: any = []
    ngOnInit(): void {
        this.formTask = this.formBuilder.group({
            moduleId: ['', Validators.required],
            ufId: ['', Validators.required],
            ruleId: ['', Validators.required],
            dueDate: ['', Validators.required],
            description: [''],
            done: ['', Validators.required],
            name: ['', Validators.required],
            grade: [{ value: null, disabled: true }]
        });

        this.fetchTaskAndSetValues();
    }

    async loadSubjects(data: any) {

        this.subjects = data;

        for (let i = 0; i < data.length; i++) {
            if (data[i]._id === this.data.moduleId) {
                this.selectOptionSubject = data[i]._id;
                this.ufs = data[i].ufs;

                for (let j = 0; j < data[i].ufs.length; j++) {
                    if (data[i].ufs[j]._id === this.data.ufId) {
                        this.selectOptionUf = data[i].ufs[j]._id;
                        this.rules = data[i].ufs[j].rules;
                    }
                }
            }
        }

        let resRules: any = await getAllRules(this.data.ufId);
        for (let k = 0; k < resRules.body.length; k++) {
            if (resRules.body[k]._id === this.data.ruleId) {
                this.selectOptionRule = resRules.body[k]._id;
                this.rules = resRules.body;
                break;
            }
        }
    }

    async fetchTaskAndSetValues() {
        let res: any = await getTask(this.data.elementId);
        let resAll: any = await getAll();

        this.loadSubjects(resAll);

        this.formTask.patchValue({
            dueDate: this.data.date,
            description: res.body.description,
            name: res.body.name,
            done: res.body.done,
            grade: res.body.done ? res.body.grade.$numberDecimal : 0,
        });

        if (res.body.done) {
            this.disabled = false;
            this.formTask.get('grade')?.enable();
        } else {
            this.formTask.get('grade')?.disable();
        }

    }

    async editTask() {

        if (!this.formTask.valid) { return; }

        const newData = {
            taskId: this.data.elementId,
            ...this.formTask.value
        };

        await updateTask(newData);
        this.dialogRef.close('edited');
    }

    finishedTask() {
        if (this.disabled === true) {
            this.formTask.get('grade')?.enable();
        } else {
            this.formTask.get('grade')?.disable();
        }

        this.formTask.get('grade')?.patchValue(0);
        this.disabled = !this.disabled;
    }

    async selectModule(moduleId: any) {
        this.selectOptionSubject = moduleId;
        this.selectOptionUf = '';
        this.selectOptionRule = '';

        for (let i = 0; i < this.subjects.length; i++) {
            if(this.subjects[i]._id === moduleId){
                this.ufs = this.subjects[i].ufs;
            }
        }

        this.rules = [];

        if(this.ufs.length === 0){
            this.emptyUfs = true;
            return;
        }

        this.emptyUfs = false;
    }

    async selectUf(ufId: any) {
        this.selectOptionUf = ufId;
        let res: any = await getAllRules(ufId);
        this.rules = res.body;
    }

    async deleteTask(){
        await deleteTask(this.data.elementId);
        this.dialogRef.close('delete');
    }
}
