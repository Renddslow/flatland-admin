import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as extend from 'extend';
import * as moment from 'moment';
import * as slug from 'slug';

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.css']
})
export class BlogEditorComponent implements OnInit {

	firebase = window['firebase'];
  disable = false;

	data = {
		title: null,
		image: null,
		topics: {},
		content: null,
		author: null,
		published: false,
		approved: false,
		date: moment()
	};

	topics = [];
	length = 0;

	topicMap = {};

	permalink: string;

	canPublish = null;

	constructor(private router: Router, private route: ActivatedRoute) {
		slug.defaults.mode = 'rfc3986';
		const user = window['user'];
		this.data.author = {
			name: user['name'],
			position: user['role']
		};
		const editor = user['roles']['blog_editor'];
		const writer = user['roles']['blog_writer'];
		if (!editor && !writer) {
			this.router.navigate(['/dashboard']);
		}
		if (editor) {
			this.canPublish = true;
		}
	}

  ngOnInit() {
		this.route.params.subscribe(params => {
			this.permalink = params['permalink'];
			this.firebase.database()
				.ref('blogTopics')
				.on('value', results => {
					const topicList = results.val();
					this.topics = Object.keys(topicList)
						.map(key => {
							return {
								id: key,
								name: topicList[key]['name']
							}
						});
					if (this.permalink !== 'new') {
						this.firebase.database()
							.ref(`blogContents/${this.permalink}`)
							.on('value', result => {
								this.data = result.val();
								const date = parseInt(result.val()['date'], 10);
								this.data.date = moment(date * 1000);
								const tMap = {
									culture: false,
									devotionals: false,
									'homes-of-influence': false,
									marriage: false,
									missions: false,
									parenting: false,
									testimonies: false,
									volunteering: false,
								};
								this.topicMap = Object.keys(tMap)
									.reduce((result, key) => {
										result[key] = this.data['topics'][key] || false;
										return result;
									}, {});
							});
					} else {
						this.topicMap = {
							culture: false,
							devotionals: false,
							'homes-of-influence': false,
							marriage: false,
							missions: false,
							parenting: false,
							testimonies: false,
							volunteering: false,
						}
					}
				});
		});
  }

	save() {
		const req = extend({}, true, this.data);
		req.topics = Object.keys(this.topicMap)
			.filter(key => this.topicMap[key])
			.reduce((result, key) => {
				result[key] = true;
				return result;
			}, {});
		if (req.date) {
			req.date = req.date.unix();
		}
		if (!this.permalink || this.permalink === 'new') {
			req.published = false;
		}
		if (!this.canPublish) {
			req.published = false;
			req.approved = false;
		} else {
			req.approved = true;
		}
		const permalink = this.permalink !== 'new' ? this.permalink : slug(req.title);
		this.saveContent(req, permalink);
	}

	publish() {
		const req = extend({}, true, this.data);
		req.topics = Object.keys(this.topicMap)
			.filter(key => this.topicMap[key])
			.reduce((result, key) => {
				result[key] = true;
				return result;
			}, {});
		if (req.date) {
			req.date = req.date.unix();
		}
		req.published = true;
		req.approved = true;
		const permalink = this.permalink !== 'new' ? this.permalink : slug(req.title);
		this.saveContent(req, permalink);
	}

	updateWordCount() {
		this.length = this.data.content ? this.data.content.split(' ').length : 0;
	}

	updateImage(event) {
		this.data.image = event;
	}

	saveContent(data, permalink) {
		this.firebase.database()
			.ref(`blogContents/${permalink}`)
			.set(data);
		this.firebase.database()
			.ref(`blogMeta/${data.date}`)
			.set({
				title: data.title,
				image: data.image,
				author: data.author.name,
				published: data.published,
				approved: data.approved,
				permalink
			});
	}

}
