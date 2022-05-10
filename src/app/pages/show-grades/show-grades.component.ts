import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isLocalStorageToken } from '../../services/auth.service';
import {getAll} from "../../services/subject.service";
@Component({
    selector: 'app-show-grades',
    templateUrl: './show-grades.component.html',
    styleUrls: ['./show-grades.component.scss']
})
export class ShowGradesComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    subjectsInfo: any[] = [];

    async ngOnInit() {

        if (!isLocalStorageToken()) {
            this.router.navigate([`/login`]);
        }

        await this.getData();

    }

    async getData() {

        const response: any = await getAll();
        response.forEach((data: any) => {
            this.subjectsInfo.push(data);
        });

    }

    selectTab(tabSelected: any){
        console.log(tabSelected)
        this.router.navigate([`/${tabSelected}`]);
    }
}
