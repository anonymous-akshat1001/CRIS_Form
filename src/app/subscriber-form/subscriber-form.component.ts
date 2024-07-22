import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VendorService } from '../services/vendor.service';

type DropdownKey = 'displayDevices' | 'servicesRequired';

@Component({
  selector: 'app-subscriber-form',
  templateUrl: './subscriber-form.component.html',
  styleUrls: ['./subscriber-form.component.css']
})
export class SubscriberFormComponent implements OnInit, OnDestroy {
  subscriberForm: FormGroup;
  private subscriptions: Subscription[] = [];
  dropdowns: { [key in DropdownKey]: boolean } = { displayDevices: false, servicesRequired: false };
  displayDevices = ['TouchScreen', 'Kiosk', 'LCD Screen'];
  servicesRequired = ['Advertisement', 'Information', 'Both'];
  subscriberCodes: string[] = [];
  selectedSubscriberId: string = '' ;

  constructor(private fb: FormBuilder, private vendorService: VendorService, private router: Router) {
    
    this.subscriberForm = this.fb.group({
      subscriber_id: ['', Validators.required],
      display_device: [[], Validators.required],
      services_required: [[], Validators.required],
      url: ['', Validators.required]
    });
  }

  getVendorId(): string | null {
    const vendorId = localStorage.getItem('vendorId');
    console.log('Retrieved vendor ID from localStorage:', vendorId);
    return vendorId;
  }

  getSubscriberCode(): string|null{
    const subscriberCode = localStorage.getItem('subscriberCode');
    console.log('Retrieved subscriber code from localStorage:', subscriberCode);
    return subscriberCode;
  }

  fetchSubscriberCodes() {
    const subscriberCode = this.getSubscriberCode();
    const subCodesSubscription = this.vendorService.getSubscriberCodes().subscribe(
      (codes: any[]) => {
        this.subscriberCodes = codes;

        if (subscriberCode) {
          this.subscriberCodes.push(subscriberCode);
        }

        if (this.selectedSubscriberId) {
          const selectedSubscriber = codes.find(code => code.subscriber_id === this.selectedSubscriberId);
          if (selectedSubscriber) {
            this.subscriberForm.patchValue({
              display_device: selectedSubscriber.display_device,
              services_required: selectedSubscriber.services_required
            });
          }
        }
      },
      (error) => {
        console.error('Error fetching subscriber codes', error);
      }
    );
    this.subscriptions.push(subCodesSubscription);
  }

  ngOnInit(): void {
    const subscriberCode = this.getSubscriberCode();
    const attach_url = localStorage.getItem('URL');
    console.log('Url for attachment',attach_url);
    if (subscriberCode) {
      this.subscriberForm.patchValue({ subscriber_id: subscriberCode });
      this.subscriberForm.patchValue({ url : attach_url})
    }
    this.fetchSubscriberCodes();
  }

  toggleDropdown(dropdown: DropdownKey) {
    this.dropdowns[dropdown] = !this.dropdowns[dropdown];
  }

  onCheckboxChange(event: any, controlName: 'display_device' | 'services_required') {
    const formArray = this.subscriberForm.get(controlName)?.value as Array<string>;
    if (event.target.checked) {
      formArray.push(event.target.value);
    } else {
      const index = formArray.indexOf(event.target.value);
      if (index > -1) {
        formArray.splice(index, 1);
      }
    }
    this.subscriberForm.get(controlName)?.setValue(formArray);
  }


  onSubmitSubscriber() {
    if (this.subscriberForm.valid) {
      const vendorId = this.getVendorId();
      console.log('Retrieved vendor ID:', vendorId);

      if (vendorId) {
        const subFormData = {
          subscriber_id: this.subscriberForm.get('subscriber_id')?.value,
          display_device: this.subscriberForm.get('display_device')?.value,
          services_required: this.subscriberForm.get('services_required')?.value,
          vendor: parseInt(vendorId, 10),
          url: this.subscriberForm.get('url')?.value
        };

        console.log('Submitting subscriber form data:', subFormData);

        const submitSub = this.vendorService.submitSubscriberForm(subFormData).subscribe(
          response => {
            console.log('Subscriber form submitted', response);
            this.router.navigate(['/landing']);
          },
          error => {
            console.error('Error submitting subscriber form', error);
          }
        );
        this.subscriptions.push(submitSub);
      } else {
        console.error('Vendor ID is null or undefined. Ensure the vendor ID is correctly set.');
      }
    } else {
      console.log('Subscriber form is invalid');
      this.getFormValidationErrors(this.subscriberForm);
    }
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
    const control = this.subscriberForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
