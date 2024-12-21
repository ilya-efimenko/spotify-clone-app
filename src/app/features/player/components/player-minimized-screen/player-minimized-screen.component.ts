import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerStore, ScreenMode, SongAction } from '../../store';
import { PlayerSongComponent } from './components/player-song/player-song.component';
import { first, Observable } from 'rxjs';
import { selectActiveTrack } from '../../../../core/store/track/track.selectors';
import { Store } from '@ngrx/store';
import { Track } from '../../../../core/models/track.interface';

@Component({
  selector: 'app-player-minimized-screen',
  standalone: true,
  imports: [CommonModule, PlayerSongComponent],
  templateUrl: './player-minimized-screen.component.html',
})
export class PlayerMinimizedScreenComponent {
  public readonly SongAction = SongAction;

  public get track$(): Observable<Track> {
    return this.store.select(selectActiveTrack);
  }

  public get songAction$(): Observable<SongAction> {
    return this.playerStore.songAction$;
  }

  private readonly store = inject(Store);
  private readonly playerStore = inject(PlayerStore);
  private audio!: HTMLAudioElement;

  public setFullScreen(): void {
    this.playerStore.updateScreenMode(ScreenMode.FULL);
  }

  public onPlayTrack(): void {
    this.track$.pipe(first()).subscribe((track) => {
      if (this.audio) {
        this.audio.play();
      } else {
        this.audio = new Audio(track.url);
        this.audio.play();
      }
      this.playerStore.updateSongAction(SongAction.PAUSE);
    });
  }

  public onPauseTrack(): void {
    this.audio.pause();
    this.playerStore.updateSongAction(SongAction.PLAY);
  }
}
