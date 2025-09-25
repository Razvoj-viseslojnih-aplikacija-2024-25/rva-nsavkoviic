import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filijala } from '../models/filijala';

@Injectable({ providedIn: 'root' })
export class FilijalaService {
  private readonly apiUrl = 'http://localhost:8080/filijala';

  constructor(private readonly http: HttpClient) {}

  // CRUD
  getAll(): Observable<Filijala[]> {
    return this.http.get<Filijala[]>(this.apiUrl);
  }

  getById(id: number): Observable<Filijala> {
    return this.http.get<Filijala>(`${this.apiUrl}/id/${id}`);
  }

  create(filijala: Filijala): Observable<Filijala> {
    return this.http.post<Filijala>(this.apiUrl, filijala);
  }

  update(id: number, filijala: Filijala): Observable<Filijala> {
    return this.http.put<Filijala>(`${this.apiUrl}/${id}`, filijala);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  // Foreign key: get Filijale by Banka
  getByBanka(bankaId: number): Observable<Filijala[]> {
    return this.http.get<Filijala[]>(`${this.apiUrl}/banka/${bankaId}`);
  }
}
