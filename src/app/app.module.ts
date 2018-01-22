import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  MatIconModule, MatButtonModule, MatSelectModule, MatInputModule, MatTooltipModule, MatCardModule,
  MatCheckboxModule, MatSidenavModule, MatChipsModule, MatToolbarModule, MatRadioModule
} from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TagInputModule } from 'ngx-chips';
import { EhrService } from './services/ehr.service';
import { ApiUrlService } from './services/apiUrl.service';
import { RoutingUrlService } from './services/routingUrl.service';
import { AuthService } from './services/auth.service';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { EprescriptionComponent } from './components/ehr/eprescription/eprescription.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DoctorBranchComponent } from './components/auth/docBranch/docBranch.component';

@NgModule({
  declarations: [
    BootstrapComponent,
    EprescriptionComponent,
    LoginComponent,
    DoctorBranchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatIconModule, MatButtonModule, MatSelectModule, MatInputModule, MatTooltipModule, MatCheckboxModule,
    MatSidenavModule, MatAutocompleteModule, MatCardModule, MatChipsModule, MatToolbarModule, MatRadioModule,
    TagInputModule,
    RouterModule.forRoot([
      {
        path: 'ehr',
        component: EprescriptionComponent,
        data: {
          title: 'E-Prescription'
        }
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'branch',
        component: DoctorBranchComponent
      },
      {
        path: '',
        redirectTo: 'ehr',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [EhrService, AuthService, ApiUrlService, RoutingUrlService],
  bootstrap: [BootstrapComponent]
})
export class AppModule { }
