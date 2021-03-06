import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
	firebase = window['firebase'];
	user = {
		email: null,
		password: null
	};
	displayError = false;

	navItems = [];

	ngOnInit() {
		if (this.firebase.auth().currentUser) {
			const nav = window.localStorage.getItem('flatland:permissions');
			this.navItems = JSON.parse(nav);
		}
	}

	login = () => {
		this.firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
			.then(() => {
				this.firebase.database()
					.ref(`users/${this.firebase.auth().currentUser.uid}`)
					.on('value', userResults => {
						const user = userResults.val();
						const roles = user.roles;
						window.localStorage.setItem('flatland:user', JSON.stringify(user));

						this.navItems = [ { label: 'Dashboard', link: '/dashboard', icon: 'dashboard' } ];
						if (roles.sermon_publisher) {
							this.navItems.push({ label: 'Sermons', link: '/sermons', icon: 'ondemand_video' });
						}
						if (roles.event_publisher) {
							this.navItems.push({ label: 'Events', link: '/events', icon: 'event' });
						}
						if (roles.blog_editor || roles.blog_writer) {
							this.navItems.push({ label: 'Blog', link: '/blog', icon: 'book' });
						}
						if (roles.feed_publisher) {
							this.navItems.push({ label: 'Bulletin', link: '/feed', icon: 'subject' });
						}
						if (roles.send_notification) {
							this.navItems.push({ label: 'Send Notification', link: '/notify', icon: 'sms' });
						}
						if (roles.add_users) {
							this.navItems.push({ label: 'Users', link: '/users', icon: 'group_add' });
						}
						window.localStorage.setItem('flatland:permissions', JSON.stringify(this.navItems));
					});
			})
			.catch(err => {
				this.displayError = true;
			});
	};

	logout() {
		this.firebase.auth().signOut();
	}
}
