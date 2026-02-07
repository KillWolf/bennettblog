import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';	

// Interfaces
import { Post } from '../../models/post';

@Component({
	selector: 'app-blog',
	imports: [DatePipe],
	templateUrl: './blog.html',
	styleUrls: ['./blog.css']
})
export class Blog {
	post = input.required<Post>();
}

