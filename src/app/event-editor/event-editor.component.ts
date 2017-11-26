import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatSnackBar } from '@angular/material';

import * as moment from 'moment';
import * as extend from 'extend';
import * as slug from 'slug';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {

	data = {
		title: null,
		category: {
			color: null,
			label: null
		},
		description: null,
		startsAt: 0,
		endsAt: 0,
		location: 'Flatland Church',
		image: null,
		jumbotron: null
	};

	firebase = window['firebase'];

	permalink: string = null;

	saveButtonText = 'Publish';
	categoriesList = [];
	categoriesMap = {};
	category = null;

	key: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: Http, public snackBar: MatSnackBar) {
		slug.defaults.mode = 'rfc3986';
	}

  ngOnInit() {
		this.route.params.subscribe(params => {
			this.permalink = params['permalink'];
			if (this.permalink !== 'new') {
				this.saveButtonText = 'Save';
				this.firebase.database()
					.ref('events')
					.orderByChild('permalink')
					.equalTo(this.permalink)
					.on('value', result => {
						this.key = Object.keys(result.val())[0];
						this.data = result.val()[this.key];

						this.firebase.database()
							.ref('eventCategories')
							.on('value', result => {
								this.categoriesMap = result.val();
								this.categoriesList = Object.keys(this.categoriesMap)
									.map(key => {
										return {
											id: key,
											label: this.categoriesMap[key].label
										};
									});
								this.category = this.categoriesList
									.filter(category => category.label === this.data.category.label)[0]['id'];
							});
					});
				}
		});
  }

	save() {
		const req = extend({}, true, this.data);
		const reference = this.permalink !== 'new' ? req.startsAt : this.key;
		req.permalink = this.permalink !== 'new' ? req.permalink : slug(this.data.title);
		req.category = this.categoriesMap[this.category];
		this.firebase.database()
			.ref(`events/${reference}`)
			.set(req);
		this.snackBar.open('Saved!', 'Close', { duration: 2000 });
		window.setInterval(() => {
			this.router.navigate(['/events/', req.permalink]);
		}, 2000);
	}

	updateTime(event, type) {
		if (type === 'start') {
			this.data.startsAt = event;
		}

		if (type === 'end') {
			this.data.endsAt = event;
		}
	}

}
