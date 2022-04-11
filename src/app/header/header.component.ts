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
    {description: "UFs", value: "SubjectsAndUfs"},
    {description: "Calendari", value: "Calendari"},
    {description: "Notes", value: "ShowGrades"}
  ]

  ngOnInit(): void {
  }
  selectTab(tab: any){
    console.log(tab.value);
    this.activeTab.emit(tab.value);
  }
}
