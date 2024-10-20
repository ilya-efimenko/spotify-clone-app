import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerStore, ScreenMode } from '../../store';

@Component({
  selector: 'app-player-minimized-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-minimized-screen.component.html',
  styleUrl: './player-minimized-screen.component.scss',
})
export class PlayerMinimizedScreenComponent {

  constructor(private readonly store: PlayerStore) {}

  public setFullScreen(): void {
    this.store.updateScreenMode(ScreenMode.FULL);
  }
}
