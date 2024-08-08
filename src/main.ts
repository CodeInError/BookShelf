import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  [importProvidersFrom([BrowserAnimationsModule])]
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
