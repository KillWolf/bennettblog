import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../blog/blog';

// Interfaces
import { Post } from '../../models/post';

@Component({
  selector: 'app-bloglist',
  imports: [Blog],
  templateUrl: './bloglist.html',
  styleUrl: './bloglist.css'
})
export class Bloglist {
	private http = inject(HttpClient);
	posts = signal<Post[]>([]);

	ngOnInit() {
		this.http.get<Post[]>('/api/posts').subscribe((posts) => {
			this.posts.set(posts);
		});
	}
}
