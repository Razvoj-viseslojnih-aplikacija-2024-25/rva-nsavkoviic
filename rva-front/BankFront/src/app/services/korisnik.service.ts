import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KorisnikUsluge } from '../models/korisnik';

@Injectable({ providedIn: 'root' })
export class KorisnikService {
  private readonly apiUrl = 'http://localhost:8080/korisnik';

  constructor(private readonly http: HttpClient) {}

  // CRUD
  getAll(): Observable<KorisnikUsluge[]> {
    return this.http.get<KorisnikUsluge[]>(this.apiUrl);
  }

  getById(id: number): Observable<KorisnikUsluge> {
    return this.http.get<KorisnikUsluge>(`${this.apiUrl}/id/${id}`);
  }

  create(korisnik: KorisnikUsluge): Observable<KorisnikUsluge> {
    return this.http.post<KorisnikUsluge>(this.apiUrl, korisnik);
  }

  update(id: number, korisnik: KorisnikUsluge): Observable<KorisnikUsluge> {
    return this.http.put<KorisnikUsluge>(`${this.apiUrl}/${id}`, korisnik);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
