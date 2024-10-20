import { inject, Injectable } from '@angular/core';
import { from, Observable, of, switchMap } from 'rxjs';
import { AccessToken } from './models/access-token.interface';
import { ApiService } from '../api/api.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly clientId = 'feaca0289e874c238b4b2e61a9b228ce';
  private readonly authUrl = new URL('https://accounts.spotify.com/authorize');
  private readonly tokenUrl = 'https://accounts.spotify.com/api/token';
  private readonly redirectUri = 'http://localhost:4200/';

  private readonly api = inject(ApiService);

  public requestUserAuth(): void {
    const codeVerifier = this.generateCodeVerifier(128);
    this.generateCodeChallenge(codeVerifier).subscribe((codeChallenge) => {
      localStorage.setItem('verifier', codeVerifier);
      document.location = `${this.authUrl}?${this.setUserAuthUrlParams(codeChallenge)}`;
    });
  }

  public getToken(code: string): void {
    const verifier = localStorage.getItem("verifier");
  
    if (!code || !verifier) {
      console.error('Authorization code or code verifier is missing');
      return;
    }
    
    this.api.postAuthRequest(
      this.tokenUrl, 
      this.setTokenRequestBody(code, verifier)
    ).subscribe({
      next: (responseData: AccessToken) => {
        const { access_token } = responseData;
        localStorage.setItem('access_token', access_token);
      },
      error: (error) => {
        console.error('Error retrieving access token:', error);
      }
    });
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

  private setUserAuthUrlParams(codeChallenge: string): string {
    const params = new URLSearchParams();
    params.append("client_id", this.clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", this.redirectUri);
    params.append("scope", "user-read-private user-read-email user-read-playback-state user-library-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", codeChallenge);

    return params.toString();
  }

  private setTokenRequestBody(code: string, verifier: string): string {
    const body = new URLSearchParams();
    body.append("client_id", this.clientId);
    body.append("grant_type", "authorization_code");
    body.append("code", code);
    body.append("redirect_uri", this.redirectUri);
    body.append("code_verifier", verifier);

    return body.toString();
  }
}
