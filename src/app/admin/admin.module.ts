import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

import { SharedModule } from '../shared.module';
import { CreatePageComponent } from './create-page/create-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { AuthGuard } from './shared/services/auth.guard';


@NgModule ({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        RouterModule.forChild( [
            {
                path: '', component: AdminLayoutComponent, children: [
                    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
                    {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
                ]
            }
        ])
    ],
    exports:
    [
        RouterModule,
    ],
    providers: [
        AuthGuard
    ]
})

export class AdminModule {

}
