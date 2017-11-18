import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
	MatToolbarModule,
	MatIconModule,
	MatSidenavModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
	{ path: 'sermons', component: AppComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
		RouterModule.forRoot(
			appRoutes
		),
		HttpModule,
		FormsModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatIconModule,
		MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
