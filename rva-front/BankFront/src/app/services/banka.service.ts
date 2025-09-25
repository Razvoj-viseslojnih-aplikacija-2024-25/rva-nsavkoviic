import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banka } from '../models/banka';

@Injectable({ providedIn: 'root' })
export class BankaService {
  private readonly apiUrl = 'http://localhost:8080/banka';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Banka[]> {
    return this.http.get<Banka[]>(this.apiUrl);
  }

  getById(id: number): Observable<Banka> {
    return this.http.get<Banka>(`${this.apiUrl}/id/${id}`);
  }

  create(banka: Banka): Observable<Banka> {
    return this.http.post<Banka>(this.apiUrl, banka);
  }

  update(id: number, banka: Banka): Observable<Banka> {
    return this.http.put<Banka>(`${this.apiUrl}/${id}`, banka);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
