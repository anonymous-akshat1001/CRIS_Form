// src/app/services/vendor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(`${this.apiUrl}/zone/`);
  }


  getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${this.apiUrl}/state/`);
  }

  getSubscriberCodes(): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subscribers`).pipe(
      map(subscribers => subscribers.map(subscriber => subscriber.subscriber_id))
    );
  }

  getDivisions(zone: string): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.apiUrl}/division/?zone=${zone}`);
  }

  submitVendorForm(formData: FormData): Observable<VendorResponse> {
    return this.http.post<VendorResponse>(`${this.apiUrl}/vendor/`, formData);
  }

  submitSubscriberForm(subFormData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/subscribers/`, subFormData);
  }
}