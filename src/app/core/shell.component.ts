import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PlayerComponent } from '../features/player/player.component';
import { PlayerStore } from '../features/player/store';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidenavComponent, PlayerComponent],
  providers: [PlayerStore],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  private readonly store = inject(PlayerStore);

  ngOnInit() {
    this.store.fetchPlayer();
  }
}
