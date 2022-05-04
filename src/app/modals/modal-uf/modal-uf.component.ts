import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-uf',
    templateUrl: './modal-uf.component.html',
    styleUrls: ['./modal-uf.component.scss']
})
export class ModalUfComponent implements OnInit {
  errorPercentage!: boolean;

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: {title: string, rules: any, total_hours:Number, trauncy_percentage:Number},
        public dialogRef: MatDialogRef<ModalUfComponent>
    ) { }

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
            rule:['',Validators.required],
            percentage:['',[Validators.required, Validators.pattern("^[0-9]*$")]]
        })
        if(this.data !== null){
            console.log(this.data);
            this.arrayOfRules= this.data.rules;
            this.UFForm.patchValue({
                title: this.data.title,
                rulesAndPercentages: this.data.rules,
                totalHours: this.data.total_hours,
                truancyPercentage: this.data.trauncy_percentage
            });
        }
        
    }

  addRule(){
    if(this.rulesAndPercentages.get('rule')?.value !== '' && this.rulesAndPercentages.get('percentage')?.value !=='' && Number(this.rulesAndPercentages.get('percentage')?.value)){
      try{
        let rule={
          rule: this.rulesAndPercentages.get('rule')?.value,
          percentage: Number(this.rulesAndPercentages.get('percentage')?.value)
        };
        this.arrayOfRules.push(rule);
        this.rulesAndPercentages.reset();
        this.UFForm.get('rulesAndPercentages')?.setValue(this.arrayOfRules);
      } catch(error) {
        return
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
    this.UFForm.get('rulesAndPercentages')?.setValue(this.arrayOfRules);
  }
  addUf(){
    let totalPercentage: Number=0;
    this.UFForm.get('rulesAndPercentages')?.value.forEach((ruleAndPercentage: any) => {
      totalPercentage += ruleAndPercentage.percentage
    })
    if(this.UFForm.invalid || totalPercentage !== 100){
      this.UFForm.markAllAsTouched();
      this.errorPercentage = true;
    }
    else if(totalPercentage === 100 && this.UFForm.valid){
      this.dialogRef.close()
      console.log(this.UFForm.value);
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
