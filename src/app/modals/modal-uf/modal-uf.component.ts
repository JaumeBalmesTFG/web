import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-uf',
  templateUrl: './modal-uf.component.html',
  styleUrls: ['./modal-uf.component.scss']
})
export class ModalUfComponent implements OnInit {

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
      totalHours:['',Validators.required],
      truancyPercentage:['',Validators.required],
    })
    this.rulesAndPercentages = this.formBuilder.group({
      rule:['',Validators.required],
      percentage:['',Validators.required]
    })
    if(this.data !== null){
      console.log(this.data);
      
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
        this.UFForm.get('rulesAndPercentages')?.setValue(this.arrayOfRules);
      } catch(error) {
        return
      }
    }
  }
  deleteRule(ruleToDelete:any){
    this.arrayOfRules.forEach((rule:any,index:Number) => {
      if(ruleToDelete.rule === rule.type){
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
    if(this.UFForm.invalid){
      console.log("invalid form");
    }
    else if(totalPercentage === 100){
      this.dialogRef.close()
      console.log(this.UFForm.value);
    }
  }
}