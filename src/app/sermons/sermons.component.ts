import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.css']
})
export class SermonsComponent implements OnInit {

	firebase = window['firebase'];
	sermons = [];
	loading = false;

	constructor(private router: Router) {}

  ngOnInit() {
		this.loading = true;
		this.firebase.database()
			.ref(`users/${this.firebase.auth().currentUser.uid}`)
			.on('value', userResult => {
				const user = userResult.val();
				if (!user.roles.sermon_publisher) {
					this.router.navigate(['/dashboard']);
				}
				this.firebase.database()
					.ref('sermons')
					.on('value', result => {
						this.sermons = Object.keys(result.val())
							.map(key => {
								const sermon = result.val()[key];
								sermon['permalink'] = key;
								return sermon;
							});
						this.sermons.sort((a, b) => {
							if (a.preached < b.preached) {
								return 1;
							}
							if (a.preached > b.preached) {
								return -1;
							}
							return 0;
						});
						this.loading = false;
					});
			});
  }

}
