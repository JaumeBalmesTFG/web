import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uf-grades',
  templateUrl: './uf-grades.component.html',
  styleUrls: ['./uf-grades.component.scss']
})
export class UfGradesComponent implements OnInit {

  constructor() { }
  UFs=[
    {title: 'UF 1', 
    rules:[{rule:'examen',percentage:80},{rule:'Practicas',percentage:20}], 
    total_hours:300, 
    truancy_percentage: 15,
    truancy_hours: 10,
    truancy_total: 66.67,
    events:[{title:'examen 1', type:"examen", grade: null},{title:'practica 1', type:"Practicas", grade: 10}]
    },
    {title: 'UF 2', rules:[{rule:'Examen',percentage:80},{rule:'Practicas',percentage:20}], total_hours:300, truancy_percentage: 15},
    {title: 'UF 3', rules:[{rule:'Examen',percentage:80},{rule:'Practicas',percentage:20}], total_hours:300, truancy_percentage: 15}
  ]
  ngOnInit(): void {
  }

}
