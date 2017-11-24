import { Component, OnInit } from '@angular/core';

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
			.ref('blogPosts')
			.on('value', results => {
				if (results.val()) {
					this.posts = Object.keys(results.val())
						.map(key => {
							const result = results.val()[key];
							result.permalink = key;
							return result;
						});
				}
				this.loading = false;
			});
  }

}
