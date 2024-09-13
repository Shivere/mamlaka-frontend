import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { paymentsData } from 'src/app/pages/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  //TODO: Use environment variables for url and HTTP interceptor to add access token
  getPayments(page: number, size: number) {
    return this.http.get<paymentsData[]>(`http://localhost:8080/api/transactions?page=${page}&size=${size}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('mamlaka-token')
      }
    });
  }
}
