import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ApiService } from './services/api/api.service';
import { PlayerComponent } from '../features/player/player.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidenavComponent, PlayerComponent],
  providers: [ApiService],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  constructor(private readonly api: ApiService) {
  }

  ngOnInit() {
    this.api.getMe().pipe().subscribe((data) => console.log(data));
  }
}
