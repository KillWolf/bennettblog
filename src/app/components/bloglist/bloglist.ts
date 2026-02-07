import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
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
	private platformId = inject(PLATFORM_ID);
	posts = signal<Post[]>([]);

	ngOnInit() {
		const isServer = typeof window === 'undefined';
		const url = isServer
			? `http://localhost:${process.env['PORT'] || 8080}/api/posts`
			: '/api/posts';

		console.log(`[DEBUG] Platform: ${isServer ? 'SERVER' : 'BROWSER'} | URL: ${url}`);

		this.http.get<Post[]>(url).subscribe({
			next: (posts) => {
				console.log(`[DEBUG] Success: Found ${posts.length} posts`);
				this.posts.set(posts);
			},
			error: (err) => {
				console.error(`[DEBUG] Fetch Failed:`, err.message);
			}
		});
	}
}
