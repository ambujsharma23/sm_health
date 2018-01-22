import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { LoginModel } from '../../../models/typings';
import { AuthService } from '../../../services/auth.service';
import { RoutingUrlService } from '../../../services/routingUrl.service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    docLoginForm: FormGroup;
    loginModel: LoginModel;
    errorMsg = '';

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
        private routingUrlService: RoutingUrlService) {
        this.docLoginForm = this.fb.group({
            'docUsername': ['', Validators.required],
            'docPassword': ['', Validators.required]
        });

        this.loginModel = {
            username: null,
            password: null
        };

    }

    ngOnInit() { }

    submitLogin() {
        if (this.docLoginForm.valid) {
            this.loginModel.username = this.docLoginForm.get('docUsername').value;
            this.loginModel.password = this.docLoginForm.get('docPassword').value;
            this.authService.login(this.loginModel).subscribe((res: Response) => {
                if (res.status === 200) {
                    this.router.navigateByUrl(this.routingUrlService.getBranchUrl());
                }
            },
            (error: Error) => {
                this.errorMsg = error.message;
            });
        }
    }
}
