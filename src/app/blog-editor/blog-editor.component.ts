import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.css']
})
export class BlogEditorComponent implements OnInit {

  disable = true;

	data = {
		title: null,
		image: null,
		tags: [],
		content: null,
		author: null,
		published: false,
		date: null
	};

  ngOnInit() {
  }

	save() {

	}

}
