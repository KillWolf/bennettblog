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
		const platform = isPlatformServer(this.platformId) ? 'SERVER' : 'BROWSER';
		const requestUrl = '/api/posts';

		// 1. This log will show in RAILWAY DASHBOARD (Server) 
		//    and in your INSPECTOR (Browser)
		console.log(`[${platform}] Fetching from: ${requestUrl}`);

		this.http.get<Post[]>(requestUrl).subscribe({
			next: (posts) => {
				console.log(`[${platform}] Success! Received ${posts.length} posts.`);
				this.posts.set(posts);
			},
			error: (err) => {
				// 2. THIS IS THE SMOKING GUN: Look for this in Railway Logs
				console.error(`[${platform}] Error fetching posts:`, err.message);
			}
		})
	}
}
