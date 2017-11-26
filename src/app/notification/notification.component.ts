import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

	length = 0;
	message: string;

  constructor(private http: Http, private snackBar: MatSnackBar, private router: Router) { }

	updateLength() {
		this.length = this.message && this.message.length || 0;
	}

	sendNotification() {
		const body = {
			message: this.message
		};
		this.http.post('https://api.flatlandchurch.com/v2/notify?key=202f1c42-7054-46ee-8ca2-ddc85f9c789b', body)
			.subscribe(res => {});
		this.snackBar.open('Sent!', 'Close', { duration: 2000 });
	}

}
