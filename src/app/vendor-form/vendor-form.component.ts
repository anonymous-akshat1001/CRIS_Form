import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { VendorService } from '../services/vendor.service';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { HttpClient } from '@angular/common/http';

interface VendorResponse {
  id: string;
  [key: string]: any;
}

interface Zone {
  code: string;
  name: string;
}

interface State {
  code: string;
  name: string;
}

interface Division {
  code: string;
  name: string;
}

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent implements OnInit, OnDestroy {
  vendorForm: FormGroup;
  zones: Zone[] = [];
  states: State[] = [];
  divisions: Division[] = [];
  file: File | null = null;
  private subscriptions: Subscription[] = [];
  isLoading = false; // Add this variable to manage loader state
  fileSizeError: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.vendorForm = this.fb.group({
      vendor_name: ['', Validators.required],
      vendor_address_line1: ['', Validators.required],
      vendor_address_line2: [''],
      vendor_address_state: ['', Validators.required],
      vendor_address_pincode: ['', Validators.required],
      vendor_location: ['', Validators.required],
      zone: ['', Validators.required],
      division: ['', Validators.required],
      vendor_mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      vendor_email: ['', [Validators.required, Validators.email]],
      nodal_person_name: ['', Validators.required],
      nodal_person_contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      nodal_person_email: ['', [Validators.required, Validators.email]],
      location_codes: ['', Validators.required],
      vendor_status: [{ value: 'new', disabled: true }, Validators.required],
      attachment: ['', Validators.required],
      attachment_url: ['']
    });
  }

  ngOnInit(): void {
    const zoneSub = this.vendorService.getZones().subscribe((data: Zone[]) => {
      this.zones = data;
      if (this.zones.length > 0) {
        this.vendorForm.get('zone')?.setValue(this.zones[0].code);
        this.onZoneChange();
      }
    });
    const stateSub = this.vendorService.getStates().subscribe((data: State[]) => {
      this.states = data;
      if (this.zones.length > 0) {
        this.vendorForm.get('state')?.setValue(this.states[0].code);
      }
    });
    this.subscriptions.push(stateSub);
    this.subscriptions.push(zoneSub);
  }

  onZoneChange() {
    const selectedZone = this.vendorForm.get('zone')?.value;
    const divisionSub = this.vendorService.getDivisions(selectedZone).subscribe((data: Division[]) => {
      this.divisions = data;
      if (this.divisions.length > 0) {
        this.vendorForm.get('division')?.setValue(this.divisions[0].code);
      }
    });
    this.subscriptions.push(divisionSub);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 5) { // Check if file size exceeds 5MB
      this.fileSizeError = 'The file size exceeds 5MB. Please upload a smaller file.';
    }

    this.file = file;
    this.vendorForm.patchValue({
      attachment: file
    });
    this.vendorForm.get('attachment')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.vendorForm.valid) {
      this.isLoading = true;  // Show loader

      const formData = new FormData();
      for (const key in this.vendorForm.value) {
        if (this.vendorForm.value.hasOwnProperty(key)) {
          formData.append(key, this.vendorForm.value[key]);
        }
      }
      if (this.file) {
        formData.append('attachment', this.file);
        formData.append('attachment_url', this.file.name);
      }

      const submitSub = this.vendorService.submitVendorForm(formData).subscribe(response => {
        
        const attachmentUrl = response['attachment'];
        this.vendorForm.patchValue({ attachment_url : attachmentUrl})
        this.vendorForm.get('attachment_url')?.value;
        console.log('Vendor form submitted successfully', response);
        console.log(attachmentUrl);
        localStorage.setItem('URL', attachmentUrl);
        
        if (response && response.id) {
          const vendorId = response.id;
          console.log('Received vendor ID:', vendorId);
          localStorage.setItem('vendorId', vendorId.toString());
          const vendorName = this.vendorForm.get('vendor_name')?.value.replace(/\s/g, "").slice(0, 8).toUpperCase();
          const vendorLocation = this.vendorForm.get('vendor_location')?.value.slice(0, 4).toUpperCase();
          const subscriberCode = `${vendorName}_${vendorLocation}`;
          console.log('Generated Subscriber Code:', subscriberCode);
          localStorage.setItem('subscriberCode', subscriberCode);
          
          this.isLoading = false;
          const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: { subscriber_id: subscriberCode }
          });
          dialogRef.afterClosed().subscribe(result => {
            this.isLoading = false;  // Hide loader
            if (result === 'subscriber') {
              this.router.navigate(['/subscriber-form']);
            } else if (result === 'landing') {
              this.router.navigate(['/landing']);
            }
          });
        }
      }, error => {
        console.error('Error submitting vendor form', error);
        this.isLoading = false;  // Hide loader on error
      });

      this.subscriptions.push(submitSub);
    } else {
      console.log('Form is invalid');
      this.getFormValidationErrors(this.vendorForm);
    }
  }

  updateFormControlValue(controlName: string, value: any): void {
    this.vendorForm.get(controlName)?.setValue(value);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getVendorId(): string | null {
    const vendorId = localStorage.getItem('vendorId');
    console.log('Retrieved vendor ID from localStorage:', vendorId);
    return vendorId;
  }

  getFormValidationErrors(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorKey => {
          console.error(`Key: ${key}, Error: ${errorKey}, Value:`, controlErrors[errorKey]);
        });
      }
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.vendorForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}