import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() activeTab: any = new EventEmitter<any>();


  constructor() { }

  tabs=[
    {description: "UFs", value: "subjectsAndUfs"},
    {description: "Calendari", value: "calendar"},
    {description: "Notes", value: "showGrades"}
  ]

  ngOnInit(): void {
  }
  selectTab(tab: any){
    console.log(tab.value);
    this.activeTab.emit(tab.value);
  }
}
