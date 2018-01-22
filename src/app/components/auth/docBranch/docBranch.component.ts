import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './docBranch.component.html',
    styleUrls: ['./docBranch.component.css']
})
export class DoctorBranchComponent implements OnInit {
    
    branches: string[] = [];

    constructor() {
        this.branches = [
            'MAX Hospital, Noida',
            'MAX Hospital, Delhi',
            'MAX Hospital, Gurugram'
        ];
    }

    ngOnInit() {

    }

}