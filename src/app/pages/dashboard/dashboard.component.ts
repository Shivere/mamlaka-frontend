import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentsService } from 'src/app/services/payments/payments.service';


export interface paymentsData {
  amount: number,
  status: string,
  timestamp: string,
  paymentMethod: string,
  transactionId: string,
  description: string
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit {

  displayedColumns: string[] = ['transactionId', 'amount', 'status', 'paymentMethod', 'time'];
  dataSource: Array<paymentsData> = [];

  constructor(private paymentsService: PaymentsService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('mamlaka-token');
    if (!token) {
      this.router.navigate(['/authentication/login']);
      return;
    }
    this.getTransactions();
  }

  getTransactions() {
    this.paymentsService.getPayments(0, 10).subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
