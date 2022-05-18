import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getAll } from 'src/app/services/subject.service';
import { deleteTruancy, getTruancy, updateTruancy } from 'src/app/services/truancy.service';

@Component({
    selector: 'app-modal-truancy-edit',
    templateUrl: './modal-truancy-edit.component.html',
    styleUrls: ['./modal-truancy-edit.component.scss']
})
export class ModalTruancyEditComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: {moduleId: string, ufId: string, elementId: string, hours: Number, reason: string, date: string},
        public dialogRef: MatDialogRef<ModalTruancyEditComponent>
    ) { }

    emptyUfs = false;
    selectOptionSubject: null | string = '';
    selectOptionUf: null | string = '';
    subjects: any = []
    ufs: any = []

    formTruancy!:FormGroup;


    ngOnInit(): void {
        this.formTruancy = this.formBuilder.group({
            moduleId: ['', Validators.required],
            ufId: ['', Validators.required],
            hours:['',Validators.required],
            reason:[''],
            date:['']
        })

        this.fetchTruancyAndSetValues();
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
                    }
                }
            }
        }
    }

    async fetchTruancyAndSetValues() {
        let res: any = await getTruancy(this.data.elementId);
        let resAll: any = await getAll();

        this.loadSubjects(resAll);

        this.formTruancy.patchValue({
            date: this.data.date,
            hours: res.body.hours,
            reason: res.body.reason
        });
    }

    async selectModule(moduleId: any) {
        this.selectOptionSubject = moduleId;
        this.selectOptionUf = '';

        for (let i = 0; i < this.subjects.length; i++) {
            if(this.subjects[i]._id === moduleId){
                this.ufs = this.subjects[i].ufs;
            }
        }

        if(this.ufs.length === 0){
            this.emptyUfs = true;
            return;
        }

        this.emptyUfs = false;
    }

    async selectUf(ufId: any) {
        this.selectOptionUf = ufId;
    }

    async editTruancy(){
        if(!this.formTruancy.valid){ return; }

        await updateTruancy({truancyId: this.data.elementId, ...this.formTruancy.value});
        this.dialogRef.close(true);
    }

    async deleteTruancy(){
        await deleteTruancy(this.data.elementId);
        this.dialogRef.close(true);
    }

    changeHours(action: string) {

        let value = this.formTruancy.get('hours')!.value;
        let new_value;

        switch (action) {
            case "minus":
                new_value = value - 1;
                break;
            case "plus":
                new_value = value + 1

        }

        if (new_value >= 0) {
            this.formTruancy.get('hours')!.setValue(new_value);
        }

    }
}
