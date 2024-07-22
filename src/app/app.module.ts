// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SubscriberFormComponent } from './subscriber-form/subscriber-form.component';
import { EmployeeAccessComponent } from './employee-access/employee-access.component';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';  // Import the Dialog Component
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './loader/loader.component';  // Add this

@NgModule({
  declarations: [
    AppComponent,
    VendorFormComponent,
    LandingPageComponent,
    SubscriberFormComponent,
    EmployeeAccessComponent,
    DialogConfirmationComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, 
    MatDialogModule, BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }