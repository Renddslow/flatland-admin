import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

	firebase = window['firebase'];
	events = [];
	loading = false;
	moment = moment;

	ngOnInit() {
		this.loading = true;
		this.firebase.database()
			.ref('events')
			.on('value', results => {
				this.events = Object.keys(results.val()).map(key => {
					return results.val()[key];
				});
				this.loading = false;
			});
  }

}
