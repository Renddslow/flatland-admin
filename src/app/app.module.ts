import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
	MatToolbarModule,
	MatIconModule,
	MatSidenavModule,
	MatFormFieldModule,
	MatCardModule,
	MatInputModule,
	MatSelectModule,
	MatDatepickerModule,
	MatButtonModule,
	MatSnackBarModule,
	MatListModule,
	MatTableModule,
	MatProgressSpinnerModule,
	MatChipsModule,
	MatCheckboxModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SermonEditorComponent } from './sermon-editor/sermon-editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImageComponent } from './form/image/image.component';
import { SermonsComponent } from './sermons/sermons.component';
import { EventEditorComponent } from './event-editor/event-editor.component';
import { EventsComponent } from './events/events.component';
import { TimeComponent } from './form/time/time.component';
import { BlogComponent } from './blog/blog.component';
import { BlogEditorComponent } from './blog-editor/blog-editor.component';
import { NotificationComponent } from './notification/notification.component';

const appRoutes: Routes = [
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'sermons', component: SermonsComponent },
	{ path: 'sermons/:permalink', component: SermonEditorComponent },
	{ path: 'events', component: EventsComponent },
	{ path: 'events/:permalink', component: EventEditorComponent },
	{ path: 'blog', component: BlogComponent },
	{ path: 'blog/:permalink', component: BlogEditorComponent },
	{ path: 'notify', component: NotificationComponent },
	{ path: '**', redirectTo: 'dashboard' }
]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SermonEditorComponent,
    DashboardComponent,
    ImageComponent,
    SermonsComponent,
    EventEditorComponent,
    EventsComponent,
    TimeComponent,
    BlogComponent,
    BlogEditorComponent,
    NotificationComponent
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
		MatSidenavModule,
		MatFormFieldModule,
		MatCardModule,
		MatInputModule,
		MatSelectModule,
		MatDatepickerModule,
		MatMomentDateModule,
		MatButtonModule,
		MatSnackBarModule,
		MatListModule,
		MatTableModule,
		MatProgressSpinnerModule,
		MatChipsModule,
		MatCheckboxModule
  ],
  providers: [MatMomentDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
