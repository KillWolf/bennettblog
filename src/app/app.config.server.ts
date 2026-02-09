import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { provideHttpClient, withInterceptors, HttpInterceptorFn } from '@angular/common/http';
import { appConfig } from './app.config';

// This interceptor ONLY runs on the Railway server
const serverBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/')) {
    // Railway defines the PORT; we talk to ourselves on localhost
    const serverUrl = `http://localhost:${process.env['PORT'] || 4000}`;
    const clonedRequest = req.clone({ url: `${serverUrl}${req.url}` });
    return next(clonedRequest);
  }
  return next(req);
};

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withInterceptors([serverBaseUrlInterceptor]))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);