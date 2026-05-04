import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({ declarations: [
        LoginComponent,
        PasswordresetComponent,
        NewpasswordComponent,
    ],
    exports: [
        LoginComponent,
        PasswordresetComponent,
        NewpasswordComponent
    ], imports: [CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AuthModule { }
