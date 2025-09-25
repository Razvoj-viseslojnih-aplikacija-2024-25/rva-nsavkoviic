import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usluga } from '../models/usluga';

@Injectable({ providedIn: 'root' })
export class UslugaService {
  private readonly apiUrl = 'http://localhost:8080/usluga';

  constructor(private readonly http: HttpClient) {}

  // CRUD
  getAll(): Observable<Usluga[]> {
    return this.http.get<Usluga[]>(this.apiUrl);
  }

  getById(id: number): Observable<Usluga> {
    return this.http.get<Usluga>(`${this.apiUrl}/id/${id}`);
  }

  create(usluga: Usluga): Observable<Usluga> {
    return this.http.post<Usluga>(this.apiUrl, usluga);
  }

  update(id: number, usluga: Usluga): Observable<Usluga> {
    return this.http.put<Usluga>(`${this.apiUrl}/${id}`, usluga);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  // Foreign key queries
  getByFilijala(filijalaId: number): Observable<Usluga[]> {
    return this.http.get<Usluga[]>(`${this.apiUrl}/filijala/${filijalaId}`);
  }

  getByKorisnik(korisnikId: number): Observable<Usluga[]> {
    return this.http.get<Usluga[]>(`${this.apiUrl}/korisnik/${korisnikId}`);
  }
}
