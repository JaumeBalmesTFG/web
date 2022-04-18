import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-grades',
  templateUrl: './show-grades.component.html',
  styleUrls: ['./show-grades.component.scss']
})
export class ShowGradesComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }
  subjects=[
    {name: 'Subject 1', checkColor: 'red'},
    {name: 'Subject 2', color: 'green'},
    {name: 'Subject 3', color: 'yellow'}
  ]
  ngOnInit(): void {
  }

  selectTab(tabSelected: any){
    console.log(tabSelected)
    this.router.navigate([`/${tabSelected}`]);
  }
}
