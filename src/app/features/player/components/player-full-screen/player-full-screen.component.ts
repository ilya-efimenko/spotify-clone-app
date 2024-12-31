import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { PlayerStore, ScreenMode } from '../../store';

@Component({
  selector: 'app-player-full-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-full-screen.component.html',
})
export class PlayerFullScreenComponent implements OnInit {
  private readonly store = inject(PlayerStore);
  private readonly document = inject(DOCUMENT);

  // public get artist$(): Observable<Artist> {
  //   return this.store.artist$;
  // }

  public async ngOnInit(): Promise<void> {
    const elem = this.document.documentElement;

    if (elem.requestFullscreen) {
      await elem.requestFullscreen();
    }

    // this.store.fetchArtist();
  }

  public async setMinimizedScreen(): Promise<void> {
    if (document?.exitFullscreen) {
      await document.exitFullscreen();
    }
    this.store.updateScreenMode(ScreenMode.MINIMIZED);
  }
}
