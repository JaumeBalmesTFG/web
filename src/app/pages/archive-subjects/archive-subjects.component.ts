import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { archiveOrDearchiveSubject, getAllArchivedSubjects } from 'src/app/services/subject.service';
import { isLocalStorageToken } from '../../services/auth.service';
@Component({
    selector: 'app-archive-subjects',
    templateUrl: './archive-subjects.component.html',
    styleUrls: ['./archive-subjects.component.scss']
})
export class ArchiveSubjectsComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    subjects: any = [];

    ngOnInit(): any {
        this.callAllArchivated();
        if(!isLocalStorageToken()){
            this.router.navigate([`/login`]);
        }
    }

    async callAllArchivated(): Promise<any> {
        let archived: any = await getAllArchivedSubjects();

        this.subjects = [];

        archived.body.forEach((element: { name: any; _id: any; archived: boolean }) => {
            this.subjects.push({ name: element.name, moduleId: element._id, archived: element.archived });
        });

        return archived;
    }

    async deleteSubject(subjectToDelete: any) {
        let res = await archiveOrDearchiveSubject(subjectToDelete);
        this.callAllArchivated();
    }

}
