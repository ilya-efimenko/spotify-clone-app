import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, Observable, of, switchMap } from 'rxjs';

@Injectable()
export class ApiService {
  private readonly apiUrl = 'https://api.spotify.com/v1/me/player';
  private readonly clientId = 'feaca0289e874c238b4b2e61a9b228ce';
  private readonly authUrl = new URL('https://accounts.spotify.com/authorize');
  private readonly redirectUri = 'http://localhost:4200/';

  constructor(
    private readonly http: HttpClient
  ) { }

  getMe(): Observable<unknown> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    return this.http.get<unknown>(`${this.apiUrl}`, {headers});
  }

  public requestUserAuth(): void {
    const codeVerifier = this.generateCodeVerifier(128);
    this.generateCodeChallenge(codeVerifier).subscribe((codeChallenge) => {
      localStorage.setItem("verifier", codeVerifier);

      const params = new URLSearchParams();
      params.append("client_id", this.clientId);
      params.append("response_type", "code");
      params.append("redirect_uri", this.redirectUri);
      params.append("scope", "user-read-private user-read-email user-read-playback-state user-library-read");
      params.append("code_challenge_method", "S256");
      params.append("code_challenge", codeChallenge);

      document.location = `${this.authUrl}?${params.toString()}`;
    });
  }

  public getToken(code: string): Observable<unknown> {
    const verifier = localStorage.getItem("verifier");

    if (!code || !verifier) {
      console.error('Authorization code or code verifier is missing');
      return of(undefined);
    }

    const body = new URLSearchParams();
    body.append("client_id", this.clientId);
    body.append("grant_type", "authorization_code");
    body.append("code", code ?? '');
    body.append("redirect_uri", this.redirectUri);
    body.append("code_verifier", verifier ?? '');

    return this.http.post("https://accounts.spotify.com/api/token", body.toString(), {
      headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" }),
    }).pipe(
      switchMap((responseData: any) => { // TODO add type
        const { access_token } = responseData;
        localStorage.setItem('access_token', access_token);
        console.log('Access token retrieved:', access_token);
        return this.getMe(); // check what to do in this case
      }),
      catchError((error) => {
        console.error('Error retrieving access token:', error);
        return of(undefined);
      })
    );
  }

  private generateCodeVerifier(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private generateCodeChallenge(codeVerifier: string): Observable<string> {
    const data = new TextEncoder().encode(codeVerifier);
    return from(window.crypto.subtle.digest('SHA-256', data)).pipe(
      switchMap((digest) => {
        return of(btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, ''));
      })
    );
  }
}
