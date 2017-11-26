import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

	firebase = window['firebase'];
	sermons = [];
	loading = false;

	posts = [];

  ngOnInit() {
		this.loading = true;
		this.firebase.database()
			.ref('blogMeta')
			.on('value', results => {
				if (results.val()) {
					this.posts = Object.keys(results.val())
						.map(key => {
							const result = results.val()[key];
							result.date = moment(parseInt(key, 10) * 1000).format('MMMM D, YYYY');
							return result;
						}).reverse();
				}
				this.loading = false;
			});
  }

}
