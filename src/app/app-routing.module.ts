// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SubscriberFormComponent } from './subscriber-form/subscriber-form.component';
import { EmployeeAccessComponent } from './employee-access/employee-access.component';


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'vendor-form', component: VendorFormComponent },
  { path: 'subscriber-form', component: SubscriberFormComponent },
  { path: 'employee-access', component: EmployeeAccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }