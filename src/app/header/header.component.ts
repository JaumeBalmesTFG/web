import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() activeTab: any = new EventEmitter<any>();
    @Input() index!: number;
    nameLastName!: string | null;
    email!: string | null;

    constructor(
        private router: Router,
    ) {
    }

    tabs = [
        {description: "Subjects", value: "subjects"},
        {description: "Calendar", value: "calendar"},
        {description: "Grades", value: "grades"}
    ]

    ngOnInit(): void {
        this.nameLastName = localStorage.getItem('nameLastName')
        this.email = localStorage.getItem('email')
    }

    selectTab(tab: any) {
        this.activeTab.emit(this.tabs[tab.index].value);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('nameLastName');
        this.router.navigate(['login'])
    }

    redirect() {
        this.router.navigate(['calendar'])
    }
}
