import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { drive_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: drive_v3.Drive,
      useFactory: (auth: OAuth2Client) => new drive_v3.Drive({ auth }),
      deps: [OAuth2Client],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
