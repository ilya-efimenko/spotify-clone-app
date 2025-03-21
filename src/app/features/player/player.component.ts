import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerStore, ScreenMode } from './store';
import { Observable } from 'rxjs';
import { PlayerFullScreenComponent } from './components/player-full-screen/player-full-screen.component';
import { PlayerMinimizedScreenComponent } from './components/player-minimized-screen/player-minimized-screen.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, PlayerFullScreenComponent, PlayerMinimizedScreenComponent],
  providers: [PlayerStore],
  templateUrl: './player.component.html',
})
export class PlayerComponent {
  public get screenMode$(): Observable<ScreenMode> {
    return this.store.screenMode$;
  }
  public readonly ScreenMode = ScreenMode;

  private readonly store = inject(PlayerStore);
}
