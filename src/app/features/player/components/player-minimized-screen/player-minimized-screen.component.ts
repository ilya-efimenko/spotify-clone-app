import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerStore, ScreenMode, SongAction } from '../../store';
import { PlayerSongComponent } from './components/player-song/player-song.component';
import { first, Observable } from 'rxjs';
import { selectActiveTrack, selectIsShowingSidebar } from '../../../../core/store/track/track.selectors';
import * as TrackActions from '../../../../core/store/track/track.actions';
import { Store } from '@ngrx/store';
import { Track } from '../../../../core/models/track.interface';
import { PlayerProgressComponent } from './components/player-progress/player-progress.component';

@Component({
  selector: 'app-player-minimized-screen',
  standalone: true,
  imports: [CommonModule, PlayerSongComponent, PlayerProgressComponent],
  templateUrl: './player-minimized-screen.component.html',
})
export class PlayerMinimizedScreenComponent {
  public readonly SongAction = SongAction;

  public get track$(): Observable<Track> {
    return this.store.select(selectActiveTrack);
  }

  public get showSidebar$(): Observable<boolean> {
    return this.store.select(selectIsShowingSidebar);
  }

  public get songAction$(): Observable<SongAction> {
    return this.playerStore.songAction$;
  }

  private readonly store = inject(Store);
  private readonly playerStore = inject(PlayerStore);
  private audio!: HTMLAudioElement;

  public onSetFullScreen(): void {
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

  public onToggleSidebar(showSidebar: boolean): void {
    this.store.dispatch(TrackActions.toggleSidebar({ showSidebar }));
  }
}
