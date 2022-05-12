import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() activeTab: any = new EventEmitter<any>();
    @Input() index!:number;
    constructor(
        private router: Router,
    ) { }
    tabs=[
        {description: "Subjects", value: "subjectsAndUfs"},
        {description: "Calendar", value: "calendar"},
        {description: "Grades", value: "showGrades"}
    ]

    ngOnInit(): void {
    }
    selectTab(tab: any){
        this.activeTab.emit(this.tabs[tab.index].value);
    }

    logout(){
        localStorage.removeItem('token')
        this.router.navigate(['login'])
    }
}
