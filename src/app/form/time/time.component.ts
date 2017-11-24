import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
	@Input() title: string;
	@Input() date: any;

	@Output('update')
	update = new EventEmitter();

  time = {
		date: null,
		hour: null,
		minute: null,
		meridian: 'pm'
	};

	ngOnInit() {
		if (this.date) {
			this.time = {
				date: moment(this.date * 1000),
				hour: moment(this.date * 1000).format('h'),
				minute: moment(this.date * 1000).format('mm'),
				meridian: moment(this.date * 1000).format('a')
			};
		}
	}

	change() {
		let timeString = this.time.date.format('YYYY-MM-DD');
		timeString += ` ${this.time.hour.toString().padStart('2', '0')}`;
		timeString += `:${this.time.minute.toString().padStart('2', '0')}`;
		timeString += ` ${this.time.meridian}`;
		this.update.emit(moment(timeString, 'YYYY-MM-DD hh:mm a').unix());
	}

}
