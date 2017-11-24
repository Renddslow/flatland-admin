import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatSnackBar } from '@angular/material';

import * as moment from 'moment';
import * as extend from 'extend';
import * as slug from 'slug';

@Component({
  selector: 'app-sermon-editor',
  templateUrl: './sermon-editor.component.html',
  styleUrls: ['./sermon-editor.component.css']
})
export class SermonEditorComponent implements OnInit {

	disable = false;

	data = {
		title: null,
		preached: null,
		series: {},
		speaker: {},
		vimeoId: null,
		created: null,
		image: null
	};

	speaker = null;
	series = null;

	seriesList = [];
	speakersList = [];

	firebase = window['firebase'];

	permalink: string = null;

	vimeoError = null;

	saveButtonText = 'Publish';

  constructor(private route: ActivatedRoute, private router: Router, private http: Http, public snackBar: MatSnackBar) {
		slug.defaults.mode = 'rfc3986';
	}

  ngOnInit() {
		this.route.params.subscribe(params => {
			this.permalink = params['permalink'];
			if (this.permalink !== 'new') {
				this.saveButtonText = 'Save';
				this.firebase.database()
					.ref(`sermons/${this.permalink}`)
					.on('value', result => {
						this.data = result.val();
						this.data.preached = moment(this.data.preached * 1000);
						this.speaker = this.data.speaker['permalink'];
						this.series = this.data.series['permalink']
					});
				}
		});
		this.firebase.database()
			.ref('series')
			.on('value', result => {
				const series = result.val();
				this.seriesList = Object.keys(series).map(key => {
					const response = series[key];
					response['permalink'] = key;
					return response;
				});
			});
			this.firebase.database()
				.ref('speakers')
				.on('value', result => {
					const speakers = result.val();
					this.speakersList = Object.keys(speakers).map(key => {
						const response = speakers[key];
						response['permalink'] = key;
						return response;
					});
				});
  }

	save = () => {
		this.disable = true;
		const req = extend(true, {}, this.data);
		const permalink = this.permalink !== 'new' ? this.permalink : slug(req.title);
		req.preached = req.preached.unix();
		req.speaker = this.speakersList.filter(speaker => speaker.permalink === this.speaker)[0];
		req.series = this.seriesList.filter(series => series.permalink === this.series)[0];
		req.created = req.created || moment().unix();
		this.firebase.database()
			.ref(`sermons/${permalink}`)
			.set(req);

		if (this.permalink === 'new') {
			this.firebase.database()
				.ref(`feed/${moment().unix()}`)
				.set({
					icon: 'play',
					image: req.image,
					permalink,
					series: req.series && req.series.title || undefined,
					title: req.title,
					type: 'sermon'
				});

			const body = {
				message: `Missed Sunday's service or want to catch up before life group? Check out this week's sermon ${req.title}`
			};
			this.http.post('https://api.flatlandchurch.com/v2/notify?key=202f1c42-7054-46ee-8ca2-ddc85f9c789b', body)
				.subscribe(res => {});
		}
		this.snackBar.open('Saved!', 'Close', { duration: 2000 });
		this.disable = false;
		window.setInterval(() => {
			this.router.navigate(['/sermons/', permalink]);
		}, 2000);
	}

	updateImage = (event) => {
		this.data.image = event;
	}

}
