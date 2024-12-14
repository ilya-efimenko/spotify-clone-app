import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerStore, ScreenMode, Song, SongAction } from '../../store';
import { PlayerSongComponent } from './components/player-song/player-song.component';
import { first, Observable } from 'rxjs';

@Component({
  selector: 'app-player-minimized-screen',
  standalone: true,
  imports: [CommonModule, PlayerSongComponent],
  templateUrl: './player-minimized-screen.component.html',
})
export class PlayerMinimizedScreenComponent {
  public readonly SongAction = SongAction;

  public get song$(): Observable<Song> {
    return this.store.song$;
  }

  public get songAction$(): Observable<SongAction> {
    return this.store.songAction$;
  }

  private readonly store = inject(PlayerStore);
  private audio!: HTMLAudioElement;

  public setFullScreen(): void {
    this.store.updateScreenMode(ScreenMode.FULL);
  }

  public onPlayTrack(): void {
    this.song$.pipe(first()).subscribe((song) => {
      if (this.audio) {
        this.audio.play();
      } else {
        this.audio = new Audio(song.url);
        this.audio.play();
      }
      this.store.updateSongAction(SongAction.PAUSE);
    });
  }

  public onPauseTrack(): void {
    this.audio.pause();
    this.store.updateSongAction(SongAction.PLAY);
  }
}
