import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { AccessToken } from '../auth/models/access-token.interface';

@Injectable({providedIn: 'root'})
export class ApiService {
  private readonly apiUrl = 'https://api.spotify.com/v1';
  private readonly http = inject(HttpClient);

  public getRequest(path: string): Observable<unknown> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    return this.http.get<unknown>(`${this.apiUrl}/${path}`, {headers});
  }

  public postRequest(path: string, body: unknown): Observable<unknown> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    return this.http.post<unknown>(`${this.apiUrl}/${path}`, body, {headers});
  }

  public postAuthRequest(path: string, body: string): Observable<AccessToken> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<AccessToken>(`${path}`, body, {headers});
  }
}
