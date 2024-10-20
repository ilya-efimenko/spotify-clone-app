import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerStore, ScreenMode } from '../../store';

@Component({
  selector: 'app-player-full-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-full-screen.component.html',
  styleUrl: './player-full-screen.component.scss',
})
export class PlayerFullScreenComponent {

  constructor(private readonly store: PlayerStore) {}

  public setMinimizedScreen(): void {
    this.store.updateScreenMode(ScreenMode.MINIMIZED);
  }
}
