import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {

	@Input() image: string;
	@Output('update')
	change = new EventEmitter();

  constructor(private http: Http) { }

	uploadImage(event) {
		const fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			const file: File = fileList[0];

			let formData: FormData = new FormData();
			formData.append('image', file);

			let headers = new Headers();
			headers.append('Authorization', 'Client-ID cbd22022907d26a');
			headers.append('Accept', 'application/json');

			const options = new RequestOptions({ headers: headers });
			this.http.post('https://api.imgur.com/3/upload', formData, options)
				.subscribe(res => {
					this.change.emit(res.json().data.link);
				});
		}
	}

}
