import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { BankaComponent } from './app/components/main/banka-component/banka-component';
import { FilijalaComponent } from './app/components/main/filijala-component/filijala-component';
import { KorisnikUslugeComponent } from './app/components/main/korisnik-component/korisnik-component';
import { UslugaComponent } from './app/components/main/usluga-component/usluga-component';
import { HomeComponent } from './app/components/utility/home-component/home-component';
import { AboutComponent } from './app/components/utility/about-component/about-component';
import { AuthorComponent } from './app/components/utility/author-component/author-component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'author', component: AuthorComponent },
      { path: 'banka', component: BankaComponent },
      { path: 'filijala', component: FilijalaComponent },
      { path: 'korisnik-usluge', component: KorisnikUslugeComponent },
      { path: 'usluga', component: UslugaComponent },
      { path: '**', redirectTo: '/home' },
    ]),
    importProvidersFrom(
      BrowserAnimationsModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatSnackBarModule,
      FormsModule,
      CommonModule,
      HttpClientModule
    ),
  ],
}).catch((err) => console.error(err));
