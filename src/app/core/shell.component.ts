import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidenavComponent],
  providers: [ApiService],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  constructor(private readonly api: ApiService) {
  }

  async ngOnInit() {
    // const params = new URLSearchParams(window.location.search);
    // const code = params.get("code");
    // console.log('code', code);

    // const access_token = localStorage.getItem('access_token');
    // console.log('access_token', access_token);
    // // await this.api.requestUserAuth(); 
    // if (!code) {
    //   await this.api.requestUserAuth(); 
    // } else {
    //   await this.api.getToken(code);
    // }

    this.api.getMe().pipe().subscribe((data) => console.log(data));
  }
}
