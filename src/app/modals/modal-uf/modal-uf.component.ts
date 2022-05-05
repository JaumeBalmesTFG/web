import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  createUf,
  updateUf
} from '../../services/uf.service'
import {
  createRule,
  updateRule,
  deleteRule
} from '../../services/rule.service'
@Component({
    selector: 'app-modal-uf',
    templateUrl: './modal-uf.component.html',
    styleUrls: ['./modal-uf.component.scss']
})
export class ModalUfComponent implements OnInit {
  errorPercentage!: boolean;

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ModalUfComponent>
    ) { }
    error!: string;
    close= false; 
    UFForm!: FormGroup;
    rulesAndPercentages!: FormGroup;
    arrayOfRules: any=[]

    ngOnInit(): void {
        this.UFForm = this.formBuilder.group({
            title:['', Validators.required],
            rulesAndPercentages:[[], Validators.required],
            totalHours:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
            truancyPercentage:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
        })
        this.rulesAndPercentages = this.formBuilder.group({
            ufId: [-1],
            ruleId: [-1],
            rule:['',Validators.required],
            percentage:['',[Validators.required, Validators.pattern("^[0-9]*$")]]
        })
        if(typeof this.data !== typeof 'a'){
          this.arrayOfRules= JSON.parse(JSON.stringify(this.data.rules));
          this.UFForm.patchValue({
              title: this.data.title,
              rulesAndPercentages: this.data.rules,
              totalHours: this.data.total_hours,
              truancyPercentage: this.data.truancyPercentage
          });
        }
    }
  addRule(){
    if(this.rulesAndPercentages.get('rule')?.value !== '' && this.rulesAndPercentages.get('percentage')?.value !=='' && Number(this.rulesAndPercentages.get('percentage')?.value)){
      if (this.rulesAndPercentages.get('ruleId')?.value === -1){
        let rule={
          rule: this.rulesAndPercentages.get('rule')?.value,
          percentage: Number(this.rulesAndPercentages.get('percentage')?.value)
        };
        this.arrayOfRules.push(rule);
        this.rulesAndPercentages.reset();
        this.UFForm.get('rulesAndPercentages')?.setValue(this.arrayOfRules);
      } else {
        let rule={
          ruleId: this.rulesAndPercentages.get('ruleId')?.value,
          ufId: this.rulesAndPercentages.get('ufId')?.value,
          rule: this.rulesAndPercentages.get('rule')?.value,
          percentage: Number(this.rulesAndPercentages.get('percentage')?.value)
        };
        this.arrayOfRules.push(rule);
        this.rulesAndPercentages.reset();
        this.UFForm.get('rulesAndPercentages')?.setValue(this.arrayOfRules);
      }
    } else {
      this.rulesAndPercentages.markAllAsTouched()
    }
  }

  deleteRule(ruleToDelete:any){
    this.arrayOfRules.forEach((rule:any,index:Number) => {
      if(ruleToDelete.rule === rule.rule){
        this.arrayOfRules.splice(index,1);
      }
    })
    if(ruleToDelete.ruleId!==null){
      deleteRule(ruleToDelete.ruleId)
    }
    this.UFForm.get('rulesAndPercentages')?.setValue(this.arrayOfRules);
  }

  async addUf(){
    let totalPercentage: Number=0;
    this.UFForm.get('rulesAndPercentages')?.value.forEach((ruleAndPercentage: any) => {
      totalPercentage += ruleAndPercentage.percentage
    })
    if(this.UFForm.invalid || totalPercentage !== 100){
      this.UFForm.markAllAsTouched();
      this.errorPercentage = true;
    }
    else if(totalPercentage === 100 && this.UFForm.valid && typeof this.data === typeof 'a'){
      let parameters = {
        name: this.UFForm.get('title')?.value,
        moduleId: this.data,
        hours: this.UFForm.get('totalHours')?.value,
        truancy_percentage: this.UFForm.get('truancyPercentage')?.value,
      }
      let res: any = await createUf(JSON.stringify(parameters))
      if(res.message === "ALREADY_EXISTS" || res.error){
        this.error=res.message
      } else {
        this.UFForm.get('rulesAndPercentages')?.value.forEach((rule: any) => {
          let parametersRule={
            ufId: res.body._id,
            title: rule.rule,
            percentage: rule.percentage
          }
          createRule(JSON.stringify(parametersRule))
        })
        this.dialogRef.close()
      }
      
    } else if (totalPercentage === 100 && this.UFForm.valid && typeof this.data !== typeof 'a'){
      let parameters = {
        name: this.UFForm.get('title')?.value,
        ufId: this.data._id,
        moduleId: this.data.moduleId,
        hours: this.UFForm.get('totalHours')?.value,
        truancy_percentage: this.UFForm.get('truancyPercentage')?.value,
      }
      let res: any = await updateUf(parameters)
      
      if(res.message === "ALREADY_EXISTS" || res.error){
        this.error=res.error
      } else {
        this.UFForm.get('rulesAndPercentages')?.value.forEach((rule: any) => {
          if(rule.ruleId===null){
            let parametersRule={
              ufId: this.data._id,
              title: rule.rule,
              percentage: rule.percentage
            }
            createRule(JSON.stringify(parametersRule))
          } else {
            let parametersRule={
              ruleId: rule.ruleId,
              ufId: rule.ufId,
              title: rule.rule,
              percentage: rule.percentage
            }
            updateRule(parametersRule)
          }
        })
        this.dialogRef.close()
      }
    }
  }
  edit(ruleToEdit: any){
    this.arrayOfRules.forEach((rule:any,index:Number) => {
      if(ruleToEdit.rule === rule.rule){
        this.arrayOfRules.splice(index,1);
      }
    })
    this.rulesAndPercentages.patchValue(ruleToEdit)
    this.UFForm.get('rulesAndPercentages')?.setValue(this.arrayOfRules);
  }
}
