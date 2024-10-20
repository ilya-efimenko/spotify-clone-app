import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  private readonly apiUrl = 'https://api.spotify.com/v1/me/player';
  private readonly accessToken = 'BQDzmLy5dygrmhayFU4dRvfl4IaHtMackiTXKgcd2xqj9bk-0lxpHrSSOB0RaIAjfdsEAW_EFKMavMo_fTBlXXq9BnM0mO9ld6Oq09IwcOk137um4n8_nU-LkvbpT_d6a1oTlhRciApqvnXFfBcpWbNYL501xx2nZX_sd0-0Oy8Ua2NqaI5oyEcKve1V_xv-JZEFWRDz2aqaHpwcfQZy3O4fXoPdo0tjM13MpjzZGRaojTCZYw';
  private readonly clientId = 'feaca0289e874c238b4b2e61a9b228ce';
  private readonly authUrl = new URL('https://accounts.spotify.com/authorize');
  private readonly redirectUri = 'http://localhost:4200/';

  constructor(
    private readonly http: HttpClient
  ) { }

  getMe(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })
    return this.http.get<any>(`${this.apiUrl}`, {headers});
  }

  public async requestUserAuth(): Promise<void> {
    const codeVerifier = this.generateCodeVerifier(128);
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    localStorage.setItem("verifier", codeVerifier);

    const params = new URLSearchParams();
    params.append("client_id", this.clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:4200/");
    params.append("scope", "user-read-private user-read-email user-read-playback-state user-library-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", codeChallenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async getToken(code: string): Promise<void> {
    const verifier = localStorage.getItem("verifier");
  
    if (!code || !verifier) {
      console.error('Authorization code or code verifier is missing');
      return;
    }
  
    const body = new URLSearchParams();
    body.append("client_id", this.clientId);
    body.append("grant_type", "authorization_code");
    body.append("code", code ?? '');
    body.append("redirect_uri", this.redirectUri);
    body.append("code_verifier", verifier ?? '');
  
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    });
  
    const responseData = await result.json();
    const { access_token } = responseData;
    localStorage.setItem('access_token', access_token);
    console.log('Access token retrieved:', access_token);
  }
  

  private generateCodeVerifier(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
  } 
}
